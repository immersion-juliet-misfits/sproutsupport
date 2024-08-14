import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Center, ButtonGroup, IconButton, useEditableControls, Flex, Editable, EditablePreview, EditableInput, Input } from '@chakra-ui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import PlantCare from './PlantCare';

const PlantSnippet = ({ plant, getPlants, handlePlantClick, getScore, updateProgressBar, handleDelete, handlePlantClick }) => {
  const [tasks, setTasks] = useState([]);
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  
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

  useEffect(() => {
    fetchTasks()
  }, [])

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
    {plant.imageUrl && <Center><img width={250} height={250} src={plant.imageUrl}></img></Center>}
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
    </Editable>
    </CardBody>
        {/* {tasks.length > 0 &&
          tasks.map((task) => (
            <p key={task.id} style={{color:"red"}}>{task.taskName}</p>
          ))
        } */}
    <CardFooter>
      <DeleteIcon color="tomato" onClick={deletePlant}/>
      <PlantCare plant={plant} tasks={tasks} fetchTasks={fetchTasks} getScore={getScore} updateProgressBar={updateProgressBar}/>
    </CardFooter>
    </Card>
  )
}

export default PlantSnippet;

