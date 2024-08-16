import React, {useState, useEffect} from 'react'
import { Box, Button } from "@chakra-ui/react"
import axios from 'axios';
import MeetupCreate from './MeetupCreate';
import MeetupList from './MeetupList';
import dayjs from 'dayjs';
import Nav from '../NavBar';
import relativeTime from "dayjs/plugin/relativeTime"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

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

const getMeetups = (): void => {
  axios.get('/meetup/all')
.then(({data})=>{
// setList(data)
const yours = [];
const pub = []
for(let i = 0; i < data.length; i++){
  if(data[i].userId === user.id){
    yours.push(data[i])
  }else{
  pub.push(data[i])
  }
  }
axios.get('/meetup/Attendee')
  .then(async (result)=>{
    const meetTest: Array<T> = []
    const editPub: Array<T> = []
    const arr = result.data
    let fuse: Array<T> = []
for(let i = 0; i < arr.length; i++){
  if(arr[i].userId === user.id && !meetTest.includes(arr[i].meet_id) ){
meetTest.push(arr[i].meet_id)
  } 
}
for(let i = 0; i < pub.length; i++){
  if(!meetTest.includes(pub[i].id)){
editPub.push(pub[i])
  }else{
    fuse.push(pub[i])
  }
}
fuse = yours.concat(fuse);
setYourAndJoin(fuse)
setPublicMeetups(editPub)
})
.catch((err)=>{
  console.error('cant\'t find Attendee: ', err)
})

setYourMeetups(yours)
if(data[0] !== undefined){
setDueDate(data[0].time_date)
let dueDe: any = data[0].time_date[14] + data[0].time_date[15]
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

let date: any = data[0].time_date.split(' ')
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

const getJoinMeetups = (): void =>{
  axios.get('/meetup/Attendee')
  .then(({data})=>{
    const meetTest: Array<T> = []
    const meetEvent: Array<T> = []
for(let i = 0; i < data.length; i++){
  if(data[i].userId === user.id && !meetTest.includes(data[i].meet_id) ){
meetTest.push(data[i].meet_id)
  }
}
axios.get('/meetup/all')
.then(({data})=>{
  for(let i = 0; i < data.length; i++){
    if(meetTest.includes(data[i].id) ){
  meetEvent.push(data[i])
    }
  }
setJoinedMeetups(meetEvent)
})
.catch((err)=>{
  console.error('Error in Meetup.tsx can\'t get list of meetups: ', err)
})


  })
  .catch((err)=>{
    console.error('can\'t get join meetups: ', err)
  })
}

const createSwapUpdate = (): void =>{
  const change = inputSwap ? false : true;
  setInputSwap(change)
}

const getTime = (): void =>{
const time: string = dayjs().format('MM/DD/YYYY hh:mm a')
setCurrentTime(time)
}

const compare = (): void =>{
  const time: string = dayjs().format('MM/DD/YYYY hh:mm a')
  const timeleft: string = dayjs(time).to(dueDate)
  const todayOrAfter: boolean = dayjs(time).isSameOrAfter(dueDate)
  const passDueDate: boolean = dayjs(time).isSameOrAfter(dueDelete)

  setTimeLeft(timeleft)

 //console.log(`current time ${time} \n dueDate ${dueDate} \n time left ${timeleft}`)
//  console.log(passDueDate ? 'deleting now' : 'it not time to delete yet')
// console.log(todayOrAfter ? 'it today or after' : 'it not today')
// console.log(passDueDate ? 'deleting now' : 'it not time to delete yet')
// console.log(dueDelete)
console.log(yourAndJoin)

if(todayOrAfter === true && passDueDate === true){
  console.log(passDueDate ? 'deleting now' : 'it not time to delete yet')
      const url = 'meetup/delete/' + yourAndJoin[0].id
  axios.delete(url)
  .then(()=>{
    refresh()
    console.log('delete')
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

const doubleCall = (): void =>{
getTime()
  if(yourAndJoin.length !== 0){
 compare()
  }
}
const refresh = (): void  =>{
  getMeetups()
  getJoinMeetups()
}

useEffect(()=>{
  getMeetups()
  getTime()
  getJoinMeetups()
}, [])

  return (<div>
    <script>{window.setInterval(doubleCall, 30000)}</script>
    <Box m={2} color='white'  backgroundColor='green'><Nav /></Box> 
    <Button onClick={()=>{showSwitch()}}>{makeStatus}</Button>
    {timeLeft.length === 0 && <Box m={2} w={'450px'} color='white' backgroundColor='green'>{currentTime}</Box>} 
    {timeLeft.length > 0 && <Box m={2} w={'450px'} color='white' backgroundColor='green'>{timeLeft}</Box>}
    {show === true && <>{inputSwap === false && <MeetupCreate refresh={getMeetups} user={user} showSwitch={showSwitch}/>} </>} 
    {show === false && <MeetupList refresh={refresh} createSwapUpdateCheck={createSwapUpdate} user={user} yours={yourMeetups} pub={publicMeetups} join={joinedMeetups}/>} 
    </div>)
};

export default Meetup;