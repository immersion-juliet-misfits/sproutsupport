import React, {useState, useEffect} from 'react'
import { Box, Button } from "@chakra-ui/react"
import axios from 'axios';
import MeetupCreate from './MeetupCreate';
import MeetupList from './MeetupList';
import dayjs from 'dayjs';
import Nav from '../NavBar';

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
const [zeroCheck, setZeroCheck] = useState(false)


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
let dueDe: any = data[0].time_date[11] + data[0].time_date[12]

if(dueDe[0] === '0'){
  dueDe.slice(1)
}
dueDe = parseInt(dueDe)
if(dueDe === 12){
  dueDe = '01'
}else{
  dueDe = (dueDe + 1)
  if(dueDe <= 9){
    dueDe = `0${dueDe}`
  }
}

let date: any = data[0].time_date.split(' ')
let hour: any = date[1].split(':')
hour[0] = dueDe
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
const day: number | string = dayjs().date() > 9 ? dayjs().date() : `0${dayjs().date()}`
const month: number | string = dayjs().month() > 9 ? dayjs().month() : `0${dayjs().month() + 1}`
let hour: number | string = dayjs().hour() > 9 ? dayjs().hour() : `0${dayjs().hour()}`
const minute: number | string = dayjs().minute() > 9 ? dayjs().minute() : `0${dayjs().minute()}`

let am_pm: string = ' am'
if(hour !== 'string'){
if(hour > 12){
  am_pm = ' pm'
}
}

if(typeof hour !== 'string'){
  if(hour > 12){
  hour -= 12;
  if(hour < 0){
    hour *= -1
  }
  if(hour < 9){
    hour = `0${hour}`
  }
  }
  if(typeof hour !== 'string' && hour < 0 ){
    hour *= -1
  }
}

const time: string = '' + month + '/' + day + '/' + dayjs().year() + ' ' + hour + ':' + minute + am_pm
setCurrentTime(time)
return time
}

const compare = (): void =>{
  if(currentTime.length !== 0 && dueDate.length !== 0 && yourAndJoin[0] !== undefined){
  let cur: Array<T> = currentTime?.split(' ')
  const curDate: Array<T> = cur[0].split('/')
  cur = cur.slice(1)
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
  let timeLeftForMeetup: string = '' 
  if(yearDiff > 0){
    timeLeftForMeetup = 'Still have ' + yearDiff + ' years left to go' 
  }else if(monthDiff > 0){
    timeLeftForMeetup = 'Still have ' + monthDiff + ' months left to go'
  }else if(dayDiff > 0){
    timeLeftForMeetup = 'Still have ' + dayDiff + ' days left to go'
  }else if(hourDiff > 0){
    timeLeftForMeetup = 'You have ' + hourDiff + ' hours left'
  }else if(minuteDiff > 0){
timeLeftForMeetup = 'You have ' + minuteDiff + ' minutes left'
  }else{
timeLeftForMeetup = 'Right Now'
  }
  // console.log(`current ${currentTime}\n due${dueDate}\n delete${dueDelete}`)
  // console.log(`zeroCheck equal ${zeroCheck}`)
   console.log(`currentTime in compare function ${currentTime}`)
  if(timeLeft !== timeLeftForMeetup){
    if(yourAndJoin[0].status === 'today' && timeLeftForMeetup === 'Right Now' && currentTime === dueDate && zeroCheck === false){
      console.log('zeroCheck ran')
setZeroCheck(true)
setTimeLeft(timeLeftForMeetup)
    }
    if(zeroCheck !== true){
    setTimeLeft(timeLeftForMeetup)
      }
   }
    if(zeroCheck === true && currentTime === dueDelete && yourAndJoin[0].status === 'today'){
      console.log('time to delete')
      const url = 'meetup/delete/' + yourAndJoin[0].id
  axios.delete(url)
  .then(()=>{
    refresh()
    setZeroCheck(false);
    console.log('delete')
  })
  .catch((err: any)=>{
    console.error('Error can\'t update: ', err)
  })
    }
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
 const test: any = getTime()
 console.log(test)
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
    {window.setInterval(doubleCall, 60000)}
    <Box m={2} color='white'  backgroundColor='green'><Nav /></Box> 
    <Button onClick={()=>{showSwitch()}}>{makeStatus}</Button>
    {timeLeft.length === 0 && <Box m={2} w={'450px'} color='white' backgroundColor='green'>{currentTime}</Box>} 
    {timeLeft.length > 0 && <Box m={2} w={'450px'} color='white' backgroundColor='green'>{timeLeft}</Box>}
    {show === true && <>{inputSwap === false && <MeetupCreate refresh={getMeetups} user={user} showSwitch={showSwitch}/>} </>} 
    {show === false && <MeetupList refresh={refresh} createSwapUpdateCheck={createSwapUpdate} user={user} yours={yourMeetups} pub={publicMeetups} join={joinedMeetups}/>} 
    </div>)
};

export default Meetup;