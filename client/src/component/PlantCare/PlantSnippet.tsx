import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Box, Text, Image, Center, ButtonGroup, IconButton, useEditableControls, Flex, Editable, EditablePreview, EditableInput, Input, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import PlantCare from './PlantCare';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const PlantSnippet = ({ plant, getPlants, handlePlantClick, getScore, updateProgressBar, handleDelete, handlePlantClick }) => {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAll] = useState([]);
  const [newName, setNewName] = useState(plant.nickname)
  const [newDescription, setNewDescription] = useState(plant.description)
  const [progress, setProgress] = useState({})

  
  // const handleDelete = () => {
  //   axios.delete(`/plants/delete/${plant.id}`)
  //   .then(() => {
  //     getPlants()
  //     console.info('Plant deleted')
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //   })
  // }

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='xs' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  const deletePlant = () => {
    handleDelete(plant.id)
  }

  const fetchTasks = () => {
    axios.get(`/plants/overdue/${plant.id}`)
      .then(({data}) => {
        setTasks(data)
      })
  }

  const fetchTaskProgress = () => {
    axios.get(`/plants/allTasks/${plant.id}`)
      .then(({data}) => {
        setAll(data)
      })
  }

  useEffect(() => {
    fetchTasks()
    fetchTaskProgress()
    socket.on('overdue', () => {
      fetchTasks()
      fetchTaskProgress()
    }) // task on

      return (() => {
        socket.off('overdue', () => {
          fetchTasks()
          fetchTaskProgress()
        })
      })
  }, [])

  const getProgress = (lastCompleted, nextCompletion) => {
    const now = new Date().getTime();
  
    if (now >= new Date(nextCompletion).getTime()) {
      return 100;
    }
  
    const totalDuration = new Date(nextCompletion).getTime() - new Date(lastCompleted).getTime();
    const elapsed = now - new Date(lastCompleted).getTime();
    const progress = (elapsed / totalDuration) * 100;
    // console.log(progress)
  
    return progress.toFixed(2);
  };

  useEffect(() => {
    // let interval;
      let interval = setInterval(() => {
        const updating = {}
        allTasks.forEach((task) => {
          updating[task.id] = getProgress(task.lastCompleted, task.nextComplection)
        })
        setProgress(updating)
      }, 1000)
    return () => clearInterval(interval)
  }, [tasks]) // **look into logic later**

  return (
    <Card bg="green.200">
    <CardHeader onClick={() => handlePlantClick(plant)} textAlign={'center'}>
      <Editable
      textAlign='center'
      defaultValue={plant.nickname}
      fontSize='2xl'
      isPreviewFocusable={false}
      onChange={(editName) => {
        setNewName(editName)
        console.log(editName)
      }}
      onSubmit={(newName) => {
        console.log('final input', newName)
        axios.patch(`/plants/update/${plant.id}`, {nickname: newName, description: newDescription})
          .then(({data}) => {
            console.log('wake up', data)
            getPlants()
          })
      }}
      submitOnBlur={false} // so user doesn't accidentally change plant name 
      >
      <EditablePreview />
      {/* Here is the custom input */}
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
        {/* <Heading size='md'>{plant.nickname}</Heading> */}
        {plant.nickname !== plant.commonName && <h3>{<strong>{plant.commonName}</strong>}</h3>}
        {/* {tasks.length === 1 && <h3>!! {tasks.length} Task Due</h3>} */}
        {tasks.length > 0 ? tasks.length === 1 ? ( <Text color="tomato">{tasks.length} Task Due</Text> ) : ( <Text color='tomato'>{tasks.length} Tasks Due</Text> ): ( <h3>No Tasks</h3> )}
        {/* <h4>{plant.CommonName}</h4> */}
    </CardHeader>
    <CardBody textAlign={'center'}>
    {plant.imageUrl && <Center><Image width={250} height={250} src={plant.imageUrl}></Image></Center>}
        <h3><em>{plant.description}</em></h3>
      <Editable
      textAlign='center'
      defaultValue={plant.description}
      fontSize='2xl'
      isPreviewFocusable={false}
      onChange={(editDesc) => {
        setNewDescription(editDesc)
        console.log(editDesc)
      }}
      onSubmit={(newDesc) => {
        console.log('final input', newName)
        axios.patch(`/plants/update/${plant.id}`, {nickname: newName, description: newDesc})
          .then(({data}) => {
            console.log('wake up', data)
            getPlants()
          })
      }}
      submitOnBlur={false} // so user doesn't accidentally change plant name 
      >
      <EditablePreview />
      {/* Here is the custom input */}
      <Input as={EditableInput} />
      <EditableControls />
    </Editable><br></br>
    <Box>
      {allTasks.length > 0 &&
      <Flex gap={4} justifyContent={"center"} wrap="wrap">
       {allTasks.map((task) => (
         <div>

          {/* <p key={task.id} style={{color:"red"}}>{task.taskName}</p> */}
    <CircularProgress trackColor='green.100' color='green.600' size={67} value={progress[task.id]}>
      {tasks.some((currTask) => currTask.id === task.id) ? (<CircularProgressLabel color={"tomato"}>{task.taskName}</CircularProgressLabel>) : (<CircularProgressLabel>{task.taskName}</CircularProgressLabel>)}
    </CircularProgress>
          </div>
        ))}
      </Flex>
      }
      </Box>
    </CardBody>
    <CardFooter>
      <DeleteIcon color="tomato" onClick={deletePlant}/>
      <PlantCare plant={plant} tasks={tasks} fetchTasks={fetchTasks} getScore={getScore} updateProgressBar={updateProgressBar} fetchTaskProgress={fetchTaskProgress} allTasks={allTasks}/>
    </CardFooter>
    </Card>
  )
}

export default PlantSnippet;

