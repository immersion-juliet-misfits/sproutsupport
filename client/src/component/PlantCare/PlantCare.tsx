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
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

const PlantCare = ({ plant, tasks, fetchTasks, getScore, updateProgressBar, fetchTaskProgress, allTasks, fetchDoneTasks, doneTasks }) => {
  const [progress, setProgress] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCompletion = (task) => {
    axios.post('/plants/completeTask', { id: task.id })
      .then(({data}) => {
        getScore()
        updateProgressBar()
      })
      .then(() => {
        fetchTaskProgress()
        fetchDoneTasks()
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
  }, [isOpen, allTasks]) // **look into logic later**
  

  return (
    <>
      <Button onClick={onOpen}>View Tasks</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth="900px" width="50%">
          <ModalHeader>
            <Flex direction="column" alignItems="center" width="100%">
              <Heading as="h1" size="lg">{plant.nickname}</Heading>
              {plant.nickname !== plant.commonName && (
                <h3>{<strong>{plant.commonName}</strong>}</h3>
              )}
              <Image width="50%" src={plant.imageUrl}></Image>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Heading as="h2" size="lg">Tasks</Heading>
          {!tasks.length && <Heading as="h2" size="md" bgGradient='linear(to-t, green.600, green.900)' bgClip={"text"}>{'No tasks due :)'}</Heading>}
          {tasks.length > 0 && // no awkward spacing now
              tasks.map((task) => (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {progress[task.id] >= 100 &&
                  <Progress colorScheme="green" bgGradient='linear(to-b, green.100, green.300)' height='32px' value={progress[task.id]} onClick={() => handleCompletion(task)}>
                  <ProgressLabel>
                    <Heading as="h2" size="md" bgGradient='linear(to-t, green.600, green.900)' bgClip={"text"}>{task.taskName}</Heading>
                  </ProgressLabel>
                </Progress>
                }
                  <br></br>
                {/* {progress[task.id] < 100 &&
                  <Progress opacity={50} colorScheme="green" hasStripe={true} isAnimated={true} bgGradient='linear(to-b, green.100, green.300)' height='32px' value={progress[task.id]} onClick={() => handleCompletion(task)}>
                  <ProgressLabel>
                    <Heading as="h2" size="md" bgGradient='linear(to-t, green.600, green.900)' bgClip={"text"}>{task.taskName}</Heading>
                  </ProgressLabel>
                </Progress>
                } */}
                </motion.div>
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
