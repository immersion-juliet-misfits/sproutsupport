import React, {useState, useEffect} from 'react'
import { Box } from "@chakra-ui/react"
import axios from 'axios';
import MeetupCreate from './MeetupCreate';
import MeetupList from './MeetupList';
import dayjs from 'dayjs';
const test = dayjs().minute()
console.log(0o1 === 1, 'for 01 and 1 equal')
console.log(test, typeof test)
const Meetup = () => {
// const [user, setUser] = useState('none')
// const [weather, setWeather] = useState({})
const [list, setList] = useState([])
const [inputSwap, setInputSwap] = useState(false)

const getMeetups = (): void => {
  axios.get('/meetup/all')
.then(({data})=>{
setList(data)
})
.catch((err)=>{
  console.error('Error in Meetup.tsx can\'t get list of meetups: ', err)
})
}

const createSwapUpdate = (): void =>{
  const change = inputSwap ? false : true;
  setInputSwap(change)
}

useEffect(()=>{
getMeetups()
}, [])

  return (<div>test 
    <Box m={2} color='red' backgroundColor='tomato'>Tomato</Box> 
   {inputSwap === false && <MeetupCreate refresh={getMeetups}/>} 
    <MeetupList list={list} refresh={getMeetups} createSwapUpdateCheck={createSwapUpdate}/>
    </div>)
};

export default Meetup;