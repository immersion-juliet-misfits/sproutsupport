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
} from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PlantCare = ({ plant, tasks }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCompletion = (task) => {
    console.log(task, 'task')
    // axios.post('/completeTask', {  })
  }

  return (
    <>
      <Button onClick={onOpen}>Trigger modal</Button>

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
          <Heading as="h3" size="md">Tasks</Heading>
          {tasks.length > 0 &&
              tasks.map((task) => (
                <p key={task.id} style={{ color: 'red' }} onClick={() => handleCompletion(task)}>
                  {task.taskName}
                </p>
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
