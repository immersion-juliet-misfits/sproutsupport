import React, {useState, useEffect} from 'react'
import { Box } from "@chakra-ui/react"
import axios from 'axios';
import MeetupCreate from './MeetupCreate';
import MeetupList from './MeetupList';
import dayjs from 'dayjs';
const Meetup = () => {
// const [user, setUser] = useState('none')
// const [weather, setWeather] = useState({})
const [list, setList] = useState([])
const [inputSwap, setInputSwap] = useState(false)
const [currentTime, setCurrentTime] = useState('')

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

const getTime = (): void =>{
const day: number | string = dayjs().date() > 9 ? dayjs().date() : `0${dayjs().date()}`
const month: number | string = dayjs().month() > 9 ? dayjs().month() : `0${dayjs().month()}`
let hour: number | string = dayjs().hour() > 9 ? dayjs().hour() : `0${dayjs().hour()}`
const minute: number | string = dayjs().minute() > 9 ? dayjs().minute() : `0${dayjs().minute()}`

const am_pm: string = typeof hour !== 'string' ? ' pm' : ' am'

if(typeof hour !== 'string'){
  hour -= 12;
}

const time: string = '' + month + '/' + day + '/' + dayjs().year() + '  ' + hour + ':' + minute + am_pm
setCurrentTime(time)
}

useEffect(()=>{
getTime()
window.setInterval(getTime, 15000)
getMeetups()
}, [])

  return (<div>test 
    <Box m={2} color='black' backgroundColor='tomato'>{currentTime}</Box> 
   {inputSwap === false && <MeetupCreate refresh={getMeetups}/>} 
    <MeetupList list={list} refresh={getMeetups} createSwapUpdateCheck={createSwapUpdate}/>
    </div>)
};

export default Meetup;