import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Box, Text, Image, Center, ButtonGroup, IconButton, useEditableControls, Flex, Editable, EditablePreview, EditableInput, Input, CircularProgress, CircularProgressLabel, EditableTextarea, Avatar } from '@chakra-ui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import PlantCare from './PlantCare';
import { motion } from "framer-motion"
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const PlantSnippet = ({ plant, getPlants, handlePlantClick, getScore, updateProgressBar, handleDelete, handlePlantClick }) => {
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [allTasks, setAll] = useState([]);
  const [newName, setNewName] = useState(plant.nickname)
  const [newDescription, setNewDescription] = useState(plant.description)
  const [progress, setProgress] = useState({})
  const [editing, setEditing] = useState(false)

  
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

  const handleEdit = () => {
    setEditing(!editing)
  }

  const handleCancel = () => {
    setNewName(plant.nickname)
    setNewDescription(plant.description)
    setEditing(false)
  }

  // const handleApprove = () => {
  //   if (newName.trim() === '') {
  //     console.error('emptry name')
  //   }
  //   // setNewName()
  //   // setNewDescription(plant.)
  // }

  const handleChanges = () => {
    let actualName = newName.trim() === '' ? plant.commonName : newName
    setNewName(actualName)
    axios.patch(`/plants/update/${plant.id}`, {nickname: actualName, description: newDescription})
      .then(({data}) => {
        getPlants()
        setEditing(false)
      })
  }

  const determineName = () => {
    if(newName.trim() === '') {
      return plant.commonName
    } else {
      return newName
    }
  }

  // const EditableControls = () => {
  //   const {
  //     isEditing,
  //     getSubmitButtonProps,
  //     getCancelButtonProps,
  //     getEditButtonProps,
  //   } = useEditableControls()

  //   return isEditing ? (
  //     <ButtonGroup justifyContent='center' size='sm'>
  //       <IconButton icon={<CloseIcon color="tomato"/>} {...getCancelButtonProps()} />
  //       <IconButton icon={<CheckIcon color="green.600"/>} {...getSubmitButtonProps()} />
  //     </ButtonGroup>
  //   ) : (
  //     <Flex justifyContent='center'>
  //       <IconButton size='xs' icon={<EditIcon />} {...getEditButtonProps()} />
  //     </Flex>
  //   )
  // }

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

  const fetchDoneTasks = () => {
    axios.get(`/plants/doneTasks/${plant.id}`)
      .then(({data}) => {
        setDoneTasks(data)
      })
  }

  useEffect(() => {
    fetchTasks()
    fetchTaskProgress()
    fetchDoneTasks()
    socket.on('overdue', () => {
      fetchTasks()
      fetchTaskProgress()
      fetchDoneTasks()
    }) // task on

      return (() => {
        socket.off('overdue', () => {
          fetchTasks()
          fetchTaskProgress()
          fetchDoneTasks()
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
    <Card bg="#6EB257" borderRadius="xl">
    <CardHeader onClick={() => handlePlantClick(plant)} textAlign={'center'}>
      <Editable
      textAlign='center'
      value={determineName()}
      defaultValue={plant.nickname}
      fontSize='2xl'
      isPreviewFocusable={true}
      isDisabled={!editing}
      onChange={setNewName}
      // onSubmit={handleChanges}
      submitOnBlur={true} // so user doesn't accidentally change plant name 
      >
      <strong>
        <Heading className='u-text' size="md">

        <EditablePreview />
        </Heading>
      </strong>
      {/* Here is the custom input */}
      {/* <Input as={EditableInput} /> */}
      <EditableInput />
      {/* <EditableControls /> */}
    </Editable>
        {/* <Heading size='md'>{plant.nickname}</Heading> */}
        {plant.nickname !== plant.commonName && <Heading className='u-text' size="sm">{<em>{plant.commonName}</em>}</Heading>}
        {plant.nickname === plant.commonName && <Heading size="sm">{<em>&nbsp;</em>}</Heading>}
        {/* {!plant.nickname.length !} */}
        {/* {tasks.length === 1 && <h3>!! {tasks.length} Task Due</h3>} */}
        {/* {tasks.length > 0 ? tasks.length === 1 ? ( <Text color="tomato">{tasks.length} Task Due</Text> ) : ( <Text color='tomato'>{tasks.length} Tasks Due</Text> ): ( <h3>&nbsp;</h3> )} */}
        {/* {tasks.length > 0 && <Avatar bgColor="#b9da44" name={`${tasks.length}`}></Avatar>} */}
        {/* <h4>{plant.CommonName}</h4> */}
    </CardHeader>
    <CardBody textAlign={'center'}>
    {/* {plant.imageUrl && <Center><Image width={200} height={200} src={plant.imageUrl} borderRadius="md"></Image></Center>} */}
    {plant.imageUrl && <Center><Image objectFit={"cover"} width={200} height={200} src={plant.imageUrl} borderRadius="md"></Image></Center>}
        {/* <h3><em>{plant.description}</em></h3> */}
      <Editable
      textAlign='center'
      value={newDescription}
      defaultValue={plant.description}
      fontSize='2xl'
      isPreviewFocusable={true}
      onChange={setNewDescription}
      isDisabled={!editing}
      // onSubmit={handleChanges}
      // onSubmit={(newDesc) => {
      //   axios.patch(`/plants/update/${plant.id}`, {nickname: newName, description: newDesc})
      //     .then(({data}) => {
      //       getPlants()
      //     })
      // }}
      submitOnBlur={true} // so user doesn't accidentally change plant name 
      >
      <Text className='u-text' fontSize='lg'>
        <EditablePreview />
      </Text>
      {/* Here is the custom input */}
      {/* <Input as={EditableInput} /> */}
      <EditableTextarea />
      {/* <EditableControls /> */}
    </Editable><br></br>
    <Box>
      {allTasks.length > 0 &&
      <Flex gap={4} justifyContent={"center"} wrap="wrap">
       {doneTasks.map((task) => (
         <motion.div whileHover={{ scale: 1.3 }}>

          {/* <p key={task.id} style={{color:"red"}}>{task.taskName}</p> */}
    <CircularProgress trackColor='#d5e8ce' color='#488B49' size={67} value={progress[task.id]}>
      <CircularProgressLabel fontSize={"12"} maxWidth={"90%"} whiteSpace={"nowrap"}>{task.taskName}</CircularProgressLabel>
    </CircularProgress>
          </motion.div>
        ))}
      </Flex>
      }
      </Box>
    </CardBody>
    <CardFooter justify={"space-between"} alignContent={"center"}>
      <Flex>
      <IconButton bgColor="tomato" aria-label='Delete plant' icon={<DeleteIcon color="white" />} onClick={deletePlant}/>
      {editing ? (
      <ButtonGroup justifyContent='center' size='md'>
        <IconButton onClick={handleCancel} icon={<CloseIcon color="tomato"/>} />
        <IconButton onClick={handleChanges} icon={<CheckIcon color="green.600"/>} />
      </ButtonGroup>
    ) : (
        <IconButton onClick={handleEdit} size='md' bgColor="#488B49" icon={<EditIcon color="white"/>} />
    )}
      </Flex>
      <PlantCare plant={plant} tasks={tasks} fetchTasks={fetchTasks} fetchDoneTasks={fetchDoneTasks} getScore={getScore} updateProgressBar={updateProgressBar} fetchTaskProgress={fetchTaskProgress} allTasks={allTasks} doneTasks={doneTasks}/>
      {/* <DeleteIcon color="tomato" onClick={deletePlant}/> */}
    </CardFooter>
    </Card>
  )
}

export default PlantSnippet;

