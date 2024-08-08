import React, {useState, useEffect} from 'react'
import { Box, Button } from "@chakra-ui/react"
import axios from 'axios';
import MeetupCreate from './MeetupCreate';
import MeetupList from './MeetupList';
import dayjs from 'dayjs';
import Nav from '../NavBar';

const Meetup = ({user}: {user: object}) => {
// const [user, setUser] = useState('none')
// const [weather, setWeather] = useState({})
const [list, setList] = useState([])
const [inputSwap, setInputSwap] = useState(false)
const [currentTime, setCurrentTime] = useState('')
const [dueDate, setDueDate] = useState('')
const [timeLeft, setTimeLeft] = useState('')
const [show, setShow] = useState(false)

const getMeetups = (): void => {
  axios.get('/meetup/all')
.then(({data})=>{
setList(data)
if(data[0] !== undefined){
setDueDate(data[0].time_date)
}
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
  if(currentTime.length !== 0 && dueDate.length !== 0){
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

setTimeLeft(yearDiff + ' years, ' + monthDiff + ' month, ' + dayDiff + ' days, ' + hourDiff + ' hours, and ' + minuteDiff + ' minute left')

let str: string = 'HEY you have a meetup today for'

if(yearDiff === 0 && monthDiff === 0 && dayDiff <= 7){
str = 'Hey you have ' + dayDiff + ' left for the ' + list[0].eventName + ' meetup'
}else{
  str = 'HEY you have a meetup today for ' + list[0].eventName
}
console.log(str)

// const obj: object = {time_date: list[0].time_date, location: list[0].location, eventName: list[0].eventName, description: list[0].description, imageUrl: list[0].imageUrl, id: list[0].id}
// const url = 'meetup/update/' + id
// axios.patch(url, obj)
// .then(()=>{
//   refresh()
//   meetupSwap({})
// })
// .catch((err: any)=>{
//   console.error('Error can\'t update: ', err)
// })

  }
}

const showSwitch = (): void => {
  if(show === false){
    setShow(true)
  }else{
    setShow(false)
  }
}

const doubleCall = (): void =>{
  getTime()
  compare()
}

useEffect(()=>{
  getMeetups()
  getTime()
}, [])

  return (<div>
    <script>{window.setInterval(doubleCall, 60000)}</script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    <Box m={2} color='white'  backgroundColor='green'><Nav /></Box> 
    <Button onClick={()=>{showSwitch()}}>create/show</Button>
    {timeLeft.length === 0 && <Box m={2} w={'450px'} color='white' backgroundColor='green'>{currentTime}</Box>} 
    {timeLeft.length > 0 && <Box m={2} w={'450px'} color='white' backgroundColor='green'>{timeLeft}</Box>}
    {show === false && <>{inputSwap === false && <MeetupCreate refresh={getMeetups} user={user} showSwitch={showSwitch}/>} </>} 
    {show === true && <MeetupList list={list} refresh={getMeetups} createSwapUpdateCheck={createSwapUpdate} user={user}/>} 
    </div>)
};

export default Meetup;