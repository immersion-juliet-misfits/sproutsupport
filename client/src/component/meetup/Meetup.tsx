import React, {useState} from 'react'
import { Box } from "@chakra-ui/react"
import MeetupCreate from './MeetupCreate';

const Meetup = () => {
const [user, setUser] = useState('none')
const [weather, setWeather] = useState({})


  return (<div>test 
    <Box m={2} color='red' backgroundColor='tomato'>Tomato</Box> 
    <MeetupCreate />
    </div>)
};

export default Meetup;