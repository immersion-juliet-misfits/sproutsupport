import React, {useState, useEffect} from 'react'
import { Box, Button } from "@chakra-ui/react"
import axios from 'axios';
import MeetupCreate from './MeetupCreate';
import MeetupList from './MeetupList';
import dayjs from 'dayjs';
import Nav from '../NavBar';

const Meetup = ({user}: {user: object}) => {
// const [weather, setWeather] = useState({})
//  const [list, setList] = useState([])
const [inputSwap, setInputSwap] = useState(false)
const [currentTime, setCurrentTime] = useState('')
const [dueDate, setDueDate] = useState('')
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
  .then((result)=>{
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
const day: number | string = dayjs().date() > 9 ? dayjs().date() : `0${dayjs().date()}`
const month: number | string = dayjs().month() > 9 ? dayjs().month() : `0${dayjs().month() + 1}`
let hour: number | string = dayjs().hour() > 9 ? dayjs().hour() : `0${dayjs().hour()}`
const minute: number | string = dayjs().minute() > 9 ? dayjs().minute() : `0${dayjs().minute()}`

const am_pm: string = typeof hour !== 'string' ? ' pm' : ' am'

if(typeof hour !== 'string'){
  hour -= 12;
  if(hour < 0){
    hour *= -1
  }
}

const time: string = '' + month + '/' + day + '/' + dayjs().year() + '  ' + hour + ':' + minute + am_pm
setCurrentTime(time)
}

const compare = (): void =>{
  for(let i = 0; i < yourAndJoin.length; i++){
  if(currentTime.length !== 0 && dueDate.length !== 0 && yourAndJoin[i] !== undefined){
  let cur: Array<T> = currentTime?.split(' ')
  const curDate: Array<T> = cur[0].split('/')
  cur = cur.slice(2)
  const curTime: Array<T> = cur[0].split(':')
  cur = cur.slice(1)
  cur = curTime.concat(cur)
  cur = curDate.concat(cur)

    let du: Array<T> = dueDate?.split(' ')
    const duDate: Array<T> = du[0].split('/')
    du = du.slice(1)
    const duTime: Array<T> = du[0].split(':')
    du = du.slice(1)
    du = duTime.concat(du)
    du = duDate.concat(du)

const yearDiff: number = (parseInt(cur[2])) - (parseInt(du[2])) >= 0 ? (parseInt(cur[2])) - (parseInt(du[2])) : ((parseInt(cur[2])) - (parseInt(du[2]))) * -1
if(cur[1][0] === 0){
  cur[1] = cur[1].slice(1)
}
if(du[1][0] === 0){
  du[1] = du[1].slice(1)
}
const dayDiff: number = (parseInt(cur[1])) - (parseInt(du[1])) >= 0 ? (parseInt(cur[1])) - (parseInt(du[1])) : ((parseInt(cur[1])) - (parseInt(du[1]))) * -1
if(cur[0][0] === 0){
  cur[0] = cur[0].slice(1)
}
if(du[0][0] === 0){
  du[0] = du[0].slice(1)
}
const monthDiff: number = (parseInt(cur[0])) - (parseInt(du[0])) >= 0 ? (parseInt(cur[0])) - (parseInt(du[0])) : ((parseInt(cur[0])) - (parseInt(du[0]))) * -1

const hourDiff: number = (parseInt(cur[3])) - (parseInt(du[3])) >= 0 ? (parseInt(cur[3])) - (parseInt(du[3])) : ((parseInt(cur[3])) - (parseInt(du[3]))) * -1

if(cur[4][0] === 0){
  cur[4] = cur[4].slice(1)
}
if(du[4][0] === 0){
  du[4] = du[4].slice(1)
}
const minuteDiff: number = (parseInt(cur[4])) - (parseInt(du[4])) >= 0 ? (parseInt(cur[4])) - (parseInt(du[4])) : ((parseInt(cur[4])) - (parseInt(du[4]))) * -1

if(i === 0){
setTimeLeft(yearDiff + ' years, ' + monthDiff + ' month, ' + dayDiff + ' days, ' + hourDiff + ' hours, and ' + minuteDiff + ' minute left')
}

let str: string = ''
let range: string = 'not in range'

if(yearDiff === 0 && monthDiff === 0 && dayDiff <= 7){
str = 'Hey you have ' + dayDiff + ' days until the ' + yourAndJoin[0].eventName + ' meetup'
range = 'in range'
}else{
  str = 'HEY you have a meetup today for ' + yourAndJoin[0].eventName
  range = 'today'
}
if(yourAndJoin[i].status === 'none' || range === 'in range'){
const obj: object = {time_date: yourAndJoin[i].time_date, location: yourAndJoin[i].location, eventName: yourAndJoin[i].eventName, description: yourAndJoin[i].description, imageUrl: yourAndJoin[i].imageUrl, id: yourAndJoin[i].id, status: range, message: str}
const url = 'meetup/update/' + yourAndJoin[i].id
axios.patch(url, obj)
.then(()=>{
  getMeetups()
})
.catch((err: any)=>{
  console.error('Error can\'t update in Meetup.tsx line 181: ', err)
})
}
  }
/////  
}////end of loop
/////
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
  compare()
  console.log(yourAndJoin)
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
    <script>{window.setInterval(doubleCall, 60000)}</script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    <Box m={2} color='white'  backgroundColor='green'><Nav /></Box> 
    <Button onClick={()=>{showSwitch()}}>{makeStatus}</Button>
    {timeLeft.length === 0 && <Box m={2} w={'450px'} color='white' backgroundColor='green'>{currentTime}</Box>} 
    {timeLeft.length > 0 && <Box m={2} w={'450px'} color='white' backgroundColor='green'>{timeLeft}</Box>}
    {show === true && <>{inputSwap === false && <MeetupCreate refresh={getMeetups} user={user} showSwitch={showSwitch}/>} </>} 
    {show === false && <MeetupList refresh={refresh} createSwapUpdateCheck={createSwapUpdate} user={user} yours={yourMeetups} pub={publicMeetups} join={joinedMeetups}/>} 
    </div>)
};

export default Meetup;