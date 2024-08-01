import React, {useState, useEffect} from 'react'
import { Box } from "@chakra-ui/react"
import axios from 'axios';
import MeetupCreate from './MeetupCreate';
import MeetupList from './MeetupList';

const Meetup = () => {
// const [user, setUser] = useState('none')
// const [weather, setWeather] = useState({})
const [list, setList] = useState([])

const getMeetups = (): void => {
  axios.get('/meetup/all')
.then(({data})=>{
setList(data)
})
.catch((err)=>{
  console.error('Error in Meetup.tsx can\'t get list of meetups: ', err)
})
}

useEffect(()=>{
getMeetups()
}, [])

  return (<div>test 
    <Box m={2} color='red' backgroundColor='tomato'>Tomato</Box> 
    <MeetupCreate refresh={getMeetups}/>
    <MeetupList list={list} refresh={getMeetups}/>
    </div>)
};

export default Meetup;