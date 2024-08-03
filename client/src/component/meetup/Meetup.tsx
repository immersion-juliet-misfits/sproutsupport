import React, {useState, useEffect} from 'react'
import { Box } from "@chakra-ui/react"
import axios from 'axios';
import MeetupCreate from './MeetupCreate';
import MeetupList from './MeetupList';
import dayjs from 'dayjs';
import Nav from '../NavBar';
const Meetup = () => {
// const [user, setUser] = useState('none')
// const [weather, setWeather] = useState({})
const [list, setList] = useState([])
const [inputSwap, setInputSwap] = useState(false)
const [currentTime, setCurrentTime] = useState('')
const [dueDate, setDueDate] = useState('')
const [timeLeft, setTimeLeft] = useState('')

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
  console.log(currentTime, currentTime.length, 'and', dueDate, dueDate.length )
  if(currentTime.length !== 0 && dueDate.length !== 0){
    console.log('ran')
  let cur: Array<T> = currentTime?.split(' ')
  const curDate: Array<T> = cur[0].split('/')
  cur = cur.slice(2)
  const curTime: Array<T> = cur[0].split(':')
  cur = cur.slice(1)
  cur = curTime.concat(cur)
  cur = curDate.concat(cur)
  console.log(cur)


    let du: Array<T> = dueDate?.split(' ')
    const duDate: Array<T> = du[0].split('/')
    du = du.slice(1)
    const duTime: Array<T> = du[0].split(':')
    du = du.slice(1)
    du = duTime.concat(du)
    du = duDate.concat(du)
    console.log(du)

const yearDiff: number = (parseInt(cur[2])) - (parseInt(du[2])) >= 0 ? (parseInt(cur[2])) - (parseInt(du[2])) : ((parseInt(cur[2])) - (parseInt(du[2]))) * -1
console.log('yearDiff',yearDiff)
if(cur[1][0] === 0){
  cur[1] = cur[1].slice(1)
}
if(du[1][0] === 0){
  du[1] = du[1].slice(1)
}
const dayDiff: number = (parseInt(cur[1])) - (parseInt(du[1])) >= 0 ? (parseInt(cur[1])) - (parseInt(du[1])) : ((parseInt(cur[1])) - (parseInt(du[1]))) * -1
console.log('dayDiff',dayDiff)
if(cur[0][0] === 0){
  cur[0] = cur[0].slice(1)
}
if(du[0][0] === 0){
  du[0] = du[0].slice(1)
}
const monthDiff: number = (parseInt(cur[0])) - (parseInt(du[0])) >= 0 ? (parseInt(cur[0])) - (parseInt(du[0])) : ((parseInt(cur[0])) - (parseInt(du[0]))) * -1
console.log('monthDiff',monthDiff)

const hourDiff: number = (parseInt(cur[3])) - (parseInt(du[3])) >= 0 ? (parseInt(cur[3])) - (parseInt(du[3])) : ((parseInt(cur[3])) - (parseInt(du[3]))) * -1
console.log('hourDiff',hourDiff)

if(cur[4][0] === 0){
  cur[4] = cur[4].slice(1)
}
if(du[4][0] === 0){
  du[4] = du[4].slice(1)
}
const minuteDiff: number = (parseInt(cur[4])) - (parseInt(du[4])) >= 0 ? (parseInt(cur[4])) - (parseInt(du[4])) : ((parseInt(cur[4])) - (parseInt(du[4]))) * -1
console.log('minuteDiff',minuteDiff)

setTimeLeft( yearDiff + ' years, ' + monthDiff + ' month, ' + dayDiff + ' days, ' + hourDiff + ' hours, and ' + minuteDiff + ' minute left')
  }
}

const doubleCall = (): void =>{
  setTimeout(getTime, 15000)
  setTimeout(compare, 20000)
  // compare()
  console.log(timeLeft)
}

useEffect(()=>{
  getMeetups()
  getTime()
  compare()
window.setInterval(doubleCall, 15000)
}, [])

  return (<div>
    <button onClick={()=>{compare()}}>click</button>
    <Box m={2} color='white' backgroundColor='green'><Nav /></Box> 
    {timeLeft.length === 0 && <Box m={2} color='white' backgroundColor='green'>{currentTime + ' and due date ' + dueDate}</Box>} 
    {timeLeft.length > 0 && <Box m={2} color='white' backgroundColor='green'>{timeLeft}</Box>}
   {inputSwap === false && <MeetupCreate refresh={getMeetups}/>} 
    <MeetupList list={list} refresh={getMeetups} createSwapUpdateCheck={createSwapUpdate}/>
    </div>)
};

export default Meetup;