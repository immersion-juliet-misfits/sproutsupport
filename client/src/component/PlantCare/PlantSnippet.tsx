import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Center } from '@chakra-ui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import PlantCare from './PlantCare';

const PlantSnippet = ({ plant, getPlants, handlePlantClick, getScore, updateProgressBar }) => {
  const [tasks, setTasks] = useState([]);
  
  // console.log(plant)
  const handleDelete = () => {
    // let plantName = plant.
    axios.delete(`/plants/delete/${plant.id}`)
    .then(() => {
      console.info('Plant deleted')
      getPlants()
    })
  }

  const fetchTasks = () => {
    axios.get(`/plants/overdue/${plant.id}`)
      .then(({data}) => {
        setTasks(data)
        // console.log(plant.nickname, data)
      })
  }

  useEffect(() => {
    fetchTasks()
      // .then(() => [
      //   getPlants()
      // ])
    // console.log(plant)
  }, [])

  return (
    <Card bg="green.200">
    <CardHeader onClick={() => handlePlantClick(plant)} textAlign={'center'}>
        <Heading size='md'>{plant.nickname}</Heading>
        {plant.nickname !== plant.commonName && <h3>{<strong>{plant.commonName}</strong>}</h3>}
        {/* {tasks.length === 1 && <h3>!! {tasks.length} Task Due</h3>} */}
        {tasks.length > 0 ? tasks.length === 1 ? ( <Text color="tomato">{tasks.length} Task Due</Text> ) : ( <Text color='tomato'>{tasks.length} Tasks Due</Text> ): ( <h3>No Tasks</h3> )}
        {/* <h4>{plant.CommonName}</h4> */}
    </CardHeader>
    <CardBody textAlign={'center'}>
    {plant.imageUrl && <Center><img width={250} height={250} src={plant.imageUrl}></img></Center>}
        <h3><em>{plant.description}</em></h3>
    </CardBody>
        {/* {tasks.length > 0 &&
          tasks.map((task) => (
            <p key={task.id} style={{color:"red"}}>{task.taskName}</p>
          ))
        } */}
    <CardFooter>
      <DeleteIcon color="tomato" onClick={handleDelete}/>
      <PlantCare plant={plant} tasks={tasks} fetchTasks={fetchTasks} getScore={getScore} updateProgressBar={updateProgressBar}/>
    </CardFooter>
    </Card>
  )
}

export default PlantSnippet;

