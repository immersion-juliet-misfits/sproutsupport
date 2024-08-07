import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading } from '@chakra-ui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';

const PlantSnippet = ({ plant, getPlants, handlePlantClick }) => {
  const [tasks, setTasks] = useState([]);
  
  // console.log(plant)
  const handleDelete = () => {
    // let plantName = plant.
    axios.delete(`/plants/delete/${plant.id}`)
      .then(() => {
        console.info('Plant deleted')
      })
      .then(() => {
        getPlants()
      })
  }

  useEffect(() => {
    axios.get(`/plants/overdue/${plant.id}`)
      .then(({data}) => {
        setTasks(data)
        // console.log(plant.nickname, data)
      })
      // .then(() => [
      //   getPlants()
      // ])
    // console.log(plant)
  }, [])

  return (
    <Card>
    <CardHeader onClick={() => handlePlantClick(plant)}>
        <Heading size='md'>{plant.nickname}</Heading>
        {plant.nickname !== plant.commonName && <h3>{<strong>{plant.commonName}</strong>}</h3>}
        {/* {tasks.length === 1 && <h3>!! {tasks.length} Task Due</h3>} */}
        {tasks.length > 0 ? tasks.length === 1 ? ( <h3>!! {tasks.length} Task Due</h3> ) : ( <h3>!! {tasks.length} Tasks Due</h3> ): ( <h3>No Tasks</h3> )}
        {/* <h4>{plant.CommonName}</h4> */}
    </CardHeader>
    <CardBody>
    {plant.imageUrl && <img width={250} height={250} src={plant.imageUrl}></img>}
        <h3><em>{plant.description}</em></h3>
    </CardBody>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <p key={task.id} style={{color:"red"}}>{task.taskName}</p>
          ))
        }
    <CardFooter>
      <DeleteIcon onClick={handleDelete}/>
    </CardFooter>
    </Card>
  )
}

export default PlantSnippet;

