import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  CardHeader,
  Heading,
  Flex,
  Image,
  CircularProgress,
  CircularProgressLabel,
  Progress,
  ProgressLabel
} from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PlantCare = ({ plant, tasks, fetchTasks, getScore, updateProgressBar, fetchTaskProgress, allTasks }) => {
  const [progress, setProgress] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCompletion = (task) => {
    axios.post('/plants/completeTask', { id: task.id })
      .then(({data}) => {
        console.log(data)
        getScore()
        updateProgressBar()
      })
      .then(() => {
        fetchTaskProgress()
        fetchTasks()
      })
  }

  const getProgress = (lastCompleted, nextCompletion) => {
    const now = new Date().getTime();
  
    if (now >= new Date(nextCompletion).getTime()) {
      return 100;
    }
  
    const totalDuration = new Date(nextCompletion).getTime() - new Date(lastCompleted).getTime();
    const elapsed = now - new Date(lastCompleted).getTime();
    const progress = (elapsed / totalDuration) * 100;
    console.log(progress)
  
    return progress.toFixed(2);
  };

  // useEffect(() => {
  //   console.log('once, maybe twice')
  // }, [])
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
  }, [isOpen, allTasks]) // **look into logic later**
  

  return (
    <>
      <Button onClick={onOpen}>View Tasks</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth="900px" width="90%">
          <ModalHeader>
            <Flex direction="column" alignItems="center" width="100%">
              <Heading as="h1" size="lg">{plant.nickname}</Heading>
              {plant.nickname !== plant.commonName && (
                <h3>{<strong>{plant.commonName}</strong>}</h3>
              )}
              <img src={plant.imageUrl}></img>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Heading as="h2" size="lg">Tasks</Heading>
          {allTasks.length > 0 &&
              allTasks.map((task) => (
                <div>
                <Progress variant="tesrt" colorScheme="green" bgGradient='linear(to-r, green.300, green.200, green.100)' height='32px' value={progress[task.id]}>
                  <ProgressLabel>
                    <Heading as="h2" size="md">{task.taskName}</Heading>
                  </ProgressLabel>
                </Progress>
                <p key={task.id} style={{ color: 'red' }} onClick={() => handleCompletion(task)}>
                  {task.taskName}
                </p>
                </div>
              ))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlantCare;
