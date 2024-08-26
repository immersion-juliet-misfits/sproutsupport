import React, {useState, useEffect, useRef} from 'react'
import { Box, Button } from "@chakra-ui/react"
import axios from 'axios';
import MeetupCreate from './MeetupCreate';
import MeetupList from './MeetupList';
import dayjs from 'dayjs';
import TopBar from '../UserProfile/TopBar';
import relativeTime from "dayjs/plugin/relativeTime"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import {AddIcon} from '@chakra-ui/icons'

dayjs.extend(relativeTime)
dayjs.extend(isSameOrAfter)

const Meetup = ({user}: {user: object}) => {
//  const [list, setList] = useState([])
const [inputSwap, setInputSwap] = useState(false)
const [currentTime, setCurrentTime] = useState('')
const [dueDate, setDueDate] = useState('')
const [dueDelete, setDueDelete] = useState('')
const [timeLeft, setTimeLeft] = useState('')
const [show, setShow] = useState(false)
const [makeStatus, setMakeStatus] = useState('create meetup')
const [yourMeetups, setYourMeetups] = useState([])
const [joinedMeetups, setJoinedMeetups] = useState([])
const [publicMeetups, setPublicMeetups] = useState([])
const [yourAndJoin, setYourAndJoin] = useState([])
const [hide, setHide] = useState(false)
const savedCallback = useRef()

const getMeetups = (): void => {
  const url: string = `/meetup/all/${user.id}`
  axios.get(url)
.then(({data})=>{
setYourMeetups(data.yours)
setJoinedMeetups(data.join)
setPublicMeetups(data.pub)
setYourAndJoin(data.combined)

if(data.combined[0] !== undefined){
setDueDate(data.combined[0].time_date)
let dueDe: any = data.combined[0].time_date[14] + data.combined[0].time_date[15]
if(dueDe[0] === '0'){
  dueDe.slice(1)
}
dueDe = parseInt(dueDe)
// if(dueDe === 12){
//   dueDe = '01'
// }else{
  dueDe = (dueDe + 10)/////////////////////////
  if(dueDe <= 9){
    dueDe = `0${dueDe}`
//  }
}

let date: any = data.combined[0].time_date.split(' ')
let hour: any = date[1].split(':')
hour[1] = dueDe
hour = hour.join(':')
date[1] = hour

if(dueDe === '01' && date[2] === 'am'){
  date[2] = 'pm'
}else if(dueDe === '01' && date[2] === 'pm'){
date[2] = 'am'
}

date = date.join(' ')
setDueDelete(date)
}
})
.catch((err)=>{
  console.error('Error in Meetup.tsx can\'t get list of meetups: ', err)
})
}



const createSwapUpdate = (): void =>{
  const change = inputSwap ? false : true;
  const otherChange = hide ? false : true;
  setInputSwap(change)
  setHide(otherChange)
}

const getTime = (): void =>{
const time: string = dayjs().format('MM/DD/YYYY hh:mm a')
setCurrentTime(time + ' ')
setCurrentTime(time)
}

const compare = (): void =>{
  const time: string = dayjs().format('MM/DD/YYYY hh:mm a')
  const timeleft: string = dayjs(time).to(dueDate)
  const todayOrAfter: boolean = dayjs(time).isSameOrAfter(dueDate)
  const passDueDate: boolean = dayjs(time).isSameOrAfter(dueDelete)
  let fromJoin = 'your meetup '

if(yourAndJoin[0].userId !== user.id){
  fromJoin = 'joined meetup '
}

  setTimeLeft(timeleft + ' for ' + fromJoin + yourAndJoin[0].eventName)

if(todayOrAfter === true && passDueDate === true){
      const url = 'meetup/delete/' + yourAndJoin[0].id
  axios.delete(url)
  .then(()=>{
    refresh()
    setTimeLeft('')
  })
  .catch((err: any)=>{
    console.error('Error can\'t update: ', err)
  })
}
   }


const showSwitch = (): void => {
  if(show === false){
    setShow(true)
    setMakeStatus('your meetups')
  }else{
    setShow(false)
    setMakeStatus('create meetup')
  }
}


const refresh = (): void  =>{
  getMeetups()
}

useEffect(()=>{
  savedCallback.current = compare;
})

useEffect(()=>{
  getMeetups()
  getTime()
  const tick = ()=>{
    getTime()
savedCallback.current()
  }


  setInterval(tick, 10000)
}, [])

  return (
  <div>
     <Box w='1100px' mx='auto' bg={'green.100'}>
     <TopBar/>
    {hide === false && <Button left={show === false ? "1260px" : '1185px'} top={show === false ? '680px' : '510px'} position="fixed" onClick={()=>{showSwitch()}}>{makeStatus === 'your meetups' ? makeStatus : (<AddIcon/>)}</Button>}
    <Box bg={'green.200'}>
    {timeLeft.length === 0 && <Box m={2} w={'450px'} color='white' bg={"green.500"}>{currentTime}</Box>}
    {timeLeft.length > 0 && <Box m={2} w={'450px'} color='white' bg={"green.500"}>{timeLeft}</Box>}
    {show === true && <>{inputSwap === false && <MeetupCreate refresh={getMeetups} user={user} showSwitch={showSwitch}/>} </>}
    {show === false && <MeetupList refresh={refresh} createSwapUpdateCheck={createSwapUpdate} user={user} yours={yourMeetups} pub={publicMeetups} join={joinedMeetups}/>}
    </Box>
    </Box>
    </div>)
};

export default Meetup;