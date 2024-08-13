import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Progress, Heading, Box, Flex, Button, Grid, GridItem } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlantSnippet from './PlantSnippet';
import LevelBar from './LevelBar';
import PlantWarnings from './PlantWarnings';
import NavBar from '../NavBar'
// import UploadImage from '../UploadImage';
// import io from 'socket.io-client';

// const socket = io('http://localhost:8000');

const OwnedPlants = ({ user }) => {
  const [plants, setPlants] = useState([])
  const [score, setScore] = useState({points: 0, level: 1})
  const [progress, setProgress] = useState(0)

  const getPlants = () => {
    console.log('jet')
    axios.get(`/plants/all/${user.id}`)
      .then(({data}) => {
        setPlants(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // const getWarnings = () => {
  //   axios.post(`/plants/warnings/2`)
  //     .then((data) => {
  //       console.log('lots of data', data)
  //     })
  // }

  const handlePlantClick = (selected) => {
    console.log(selected);
  };

 
  const getScore = () => {
    axios.get(`/plants/points/${user.id}`)
      .then((scorecard) => {
        setScore(scorecard.data)
      })
  }

  const getNextPointReq = (currLvl) => {
    // console.log(currLvl, 50 + (currLvl * 50))
    return 50 + (currLvl * 50)
  }

  const updateProgressBar = () => {
    const progress = (score.points / getNextPointReq(score.level)) * 100
    setProgress(progress);
  }

  useEffect(() => {
    getScore()
  }, [])

  useEffect(() => {
    updateProgressBar()
  }, [score])

  const handleDelete = (plantId) => {
    console.log('delete this', plantId)
    axios.delete(`/plants/delete/${plantId}`)
    .then(() => {
      setPlants((prev) => prev.filter((sprout) => sprout.id !== plantId))
      // getPlants()
      console.info('Plant deleted')
    })
    .catch((err) => {
      console.error(err)
    })
  }

  // useEffect(() => {
  //   getWarnings()
  // }, [])

  useEffect(() => {
    getPlants();
    // getWarnings();
  }, []) // stale reference || made everytime reran

  return (
    <Box mx="auto" bg="green.200" p={5}>
      <NavBar />
      <Heading textAlign={'center'}>{`Hey, ${user.userName}`}</Heading>
      <Grid templateColumns="1fr 2fr" gap={2}>
        <GridItem>
          <Box color='yellow.100' bg='orange.300' p={2}>
           <PlantWarnings user={user}/>
          </Box>
      </GridItem>
      <GridItem>
      <Box color='green.100' bg='green.400' p={2}>
      <LevelBar user={user} score={score} progress={progress}/>
      </Box>
      </GridItem>
      </Grid>
      <Heading textAlign={'center'}>Your Plants</Heading>
      {/* will eventually be used with cards... */}
      <Link to={'/plantfinder'}>
        <Button colorScheme={'green'}>Add a Plant { <AddIcon /> } </Button>
      </Link>
      {/* make into seperate component */}
      <Box bg={'green.700'} p={5}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {plants.length > 0 &&
        plants.map((plant) => (
          <PlantSnippet key={plant.id} plant={plant} getPlants={getPlants} handlePlantClick={handlePlantClick} getScore={getScore} updateProgressBar={updateProgressBar} handleDelete={handleDelete} handlePlantClick={handlePlantClick}/>
          // <Card>
          //   <CardHeader>
          //     <Heading size='md'>{plant.nickname}</Heading>
          //     {plant.nickname !== plant.commonName && <h3>{<strong>{plant.commonName}</strong>}</h3>}
          //     {/* <h4>{plant.CommonName}</h4> */}
          //   </CardHeader>
          //   <CardBody>
          //     <h3>{plant.description}</h3>
          //   </CardBody>
          // </Card>
        ))
      }
      </Grid>
      </Box>
    </Box>
  );
};

export default OwnedPlants;
