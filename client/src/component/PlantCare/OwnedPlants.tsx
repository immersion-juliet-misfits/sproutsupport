import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Progress, Heading } from '@chakra-ui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlantSnippet from './PlantSnippet';
import LevelBar from './LevelBar';
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

  const handlePlantClick = (plant) => {
    console.log('selected plant', plant)
    // setSelected(selected);
  };

 
  const getScore = () => {
    axios.get(`/plants/points/${user.id}`)
      .then((scorecard) => {
        console.log(scorecard.data.points)
        setScore(scorecard.data)
      })
  }

  const getNextPointReq = (currLvl) => {
    console.log(currLvl, 50 + (currLvl * 50))
    return 50 + (currLvl * 50)
  }

  const updateProgressBar = () => {
    const progress = (score.points / getNextPointReq(score.level + 1)) * 100
    setProgress(progress);
  }

  useEffect(() => {
    console.log(score, 'score')
    getScore()
  }, [])

  useEffect(() => {
    updateProgressBar()
  }, [score])

  // const handleDelete = () => {
  //   // let plantName = plant.
  //   axios.delete(`/plants/delete/${plant.id}`)
  //     .then(() => {
  //       console.info('Plant deleted')
  //     })
  //     .then(() => {
  //       getPlants()
  //     })
  // }

  useEffect(() => {
    getPlants();
  }, [getPlants]) // stale reference || made everytime reran

  return (
    <div>
      <LevelBar user={user} score={score} progress={progress}/>
      <Heading>{`${user.userName}'s Owned Plants`}</Heading>
      {/* will eventually be used with cards... */}
      <Link to={'/plantfinder'}>
        <input type="button" value="Add a Plant"></input>
      </Link>
      {/* make into seperate component */}
      {plants.length > 0 &&
        plants.map((plant) => (
          <PlantSnippet key={plant.id} plant={plant} getPlants={getPlants} handlePlantClick={handlePlantClick} getScore={getScore} updateProgressBar={updateProgressBar}/>
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
    </div>
  );
};

export default OwnedPlants;
