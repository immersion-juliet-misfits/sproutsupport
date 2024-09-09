import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Progress, Heading, Box, Flex, Button, Grid, GridItem, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlantSnippet from './PlantSnippet';
import LevelBar from './LevelBar';
import PlantWarnings from './PlantWarnings';
import NavBar from '../NavBar'
import TopBar from '../UserProfile/TopBar';
import { RiPlantFill } from "react-icons/ri";
import { motion } from "framer-motion"
// import UploadImage from '../UploadImage';
// import io from 'socket.io-client';

// const socket = io('http://localhost:8000');

const OwnedPlants = ({ user }) => {
  const [plants, setPlants] = useState([])
  const [score, setScore] = useState({points: 0, level: 1})
  const [progress, setProgress] = useState(0)

  const getPlants = () => {
    axios.get(`/plants/all/${user.id}`)
      .then(({data}) => {
        setPlants(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

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

  const editPlant = (plantId) => {
    setPlants((prev) => prev.map((plant) => plant.id === plantId.id ? plantId : plant))
  }

  // useEffect(() => {
  //   getWarnings()
  // }, [])

  useEffect(() => {
    getPlants();
    // getWarnings();
  }, []) // stale reference || made everytime reran

  return (
    // <Box color='green.500' mx="auto" p={5}>
    <Box w='1100px' color='#507255' mx="auto" p={7}>
      <TopBar />
      <Heading textAlign={'center'}>{`Hey, ${user.userName.split(' ')[0]}`}</Heading>
      <Grid templateColumns="1fr 2fr" gap={2}>
        <GridItem>
          <Box color='#488B49' bg='#b9da44' p={2} height="100%" borderRadius="xl">
           <PlantWarnings user={user}/>
          </Box>
      </GridItem>
      <GridItem>
      <Box color='#d5e8ce' bg='#488B49' p={2} height="100%" borderRadius="xl">
      <LevelBar user={user} score={score} progress={progress}/>
      </Box>
      </GridItem>
      </Grid><br></br>
      <Heading textAlign={'center'}>Your Plants</Heading>
      {/* will eventually be used with cards... */}
      <Box position={"relative"} bg='#488B49' p={5} borderRadius="xl">
      {/* <motion.div drag dragConstraints={{top: -20, left: -20, right: 20, bottom: 20}}> */}
      <Link to={'/plantfinder'}>
        <IconButton fontSize="3xl" width="70px" height="70px" position="absolute" size="lg" top="-5" right="-5" zIndex="10" bgColor='#4AAD52' color="#d5e8ce" icon={<><RiPlantFill />+</>} isRound={true} aria-label='New Plant'>New Plant</IconButton>
      </Link>
      {/* </motion.div> */}
      {/* make into seperate component */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {plants.length > 0 &&
        plants.map((plant) => (
          <PlantSnippet key={plant.id} plant={plant} getPlants={getPlants} handlePlantClick={handlePlantClick} getScore={getScore} updateProgressBar={updateProgressBar} handleDelete={handleDelete} handlePlantClick={handlePlantClick} editPlant={editPlant}/>
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
      {!plants.length && <Heading size={"lg"}>No sprouts...yet.</Heading>}
      </Grid>
      </Box>
    </Box>
  );
};

export default OwnedPlants;
