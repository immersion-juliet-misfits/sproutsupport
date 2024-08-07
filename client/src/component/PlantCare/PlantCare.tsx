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
    Button
  } from '@chakra-ui/react'
  import axios from 'axios';
import { Link } from 'react-router-dom';



const PlantCare = ({plant}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Button onClick={onOpen}>Trigger modal</Button>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent maxWidth="900px"  width="90%" >
            <ModalHeader>{plant.nickname}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>bfabfhvbhlFHLIAEBGHLEADHJLGBJL</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default PlantCare;