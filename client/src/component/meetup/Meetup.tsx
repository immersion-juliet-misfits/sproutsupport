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
import MeetupCard from './MeetupCard';

dayjs.extend(relativeTime)
dayjs.extend(isSameOrAfter)

const Meetup = ({user}: {user: object}) => {
const [inputSwap, setInputSwap] = useState(false)
const [moreInfo, setMoreINfo] = useState(false)
const [cardInfo, setCardInfo] = useState({})
const [show, setShow] = useState(false)
const [makeStatus, setMakeStatus] = useState('create meetup')
const [yourMeetups, setYourMeetups] = useState([])
const [joinedMeetups, setJoinedMeetups] = useState([])
const [publicMeetups, setPublicMeetups] = useState([])
const [hide, setHide] = useState(false)
const [buttonHide, setButtonHide] = useState(false)
const savedCallback = useRef()

const getMeetups = (): void => {
  const url: string = `/meetup/all/${user.id}`
  axios.get(url)
.then(({data})=>{
setYourMeetups(data.yours)
setJoinedMeetups(data.join)
setPublicMeetups(data.pub)
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

const compare = (): void =>{
  const arr1: Array<T> = [].concat(yourMeetups)
  const arr2: Array<T> = [].concat(joinedMeetups)
 for(let t = 0; t < 2; t++){
  let loop: Array<T> ;
  if(t === 0){
loop = arr1
  }else{
    loop = arr2
  }
  for(let i = 0; i < loop.length; i++){
let delet: any = arr1[i].time_date[11] + arr1[i].time_date[12]
let amPm: any = arr1[i].time_date[17] + arr1[i].time_date[18]
delet = parseInt(delet)
delet = (delet + 1)//
if(delet > 12){
 delet = delet - 12
}
if(delet <= 9){
 delet = `0${delet}`
}
if(typeof delet !== 'string'){
  delet = delet.toString()
}
if(amPm === 'am' && delet === '01'){
  amPm = 'pm'
}else if(amPm === 'pm' && delet === '01'){
amPm = 'am'
}
const time: any = arr1[i].time_date.split(' ')
const cur: string = dayjs().format('MM/DD/YYYY hh:mm a')
const h: any = time[1].split(':')
h[0] = delet
time[2] = amPm
time[1] = h.join(':')
time = time.join(' ')
arr1[i].dueDelete = time
arr1[i].timeleft = dayjs(cur).to(time)
}
 } 

const all = arr1.concat(arr2)
setYourMeetups(arr1)
setJoinedMeetups(arr2)
let check = 0

for(let i = 0; i < all.length; i++){
  const time: string = dayjs().format('MM/DD/YYYY hh:mm a')
  const todayOrAfter: boolean = dayjs(time).isSameOrAfter(all[i].time_date)
  const passDueDate: boolean = dayjs(time).isSameOrAfter(all[i].dueDelete)
if(todayOrAfter === true && passDueDate === true){
      const url = 'meetup/delete/' + all[i].id
  axios.delete(url)
  .then(()=>{
    check++
  })
  .catch((err: any)=>{
    console.error('Error can\'t update: ', err)
  })
}
}
if(check !== 0){
  getMeetups()
}

   }


const showSwitch = (card: boolean, info: object): void => {
  if(card === undefined){
  if(show === false){
    setShow(true)
    setMakeStatus('your meetups')
  }else{
    setShow(false)
    setMakeStatus('create meetup')
  }
}else{
  setCardInfo(info)
  setMoreINfo(card)
}
}

const buttonCheck = (check: boolean): void =>{
if(check){
  setButtonHide(true)
}else{
  setButtonHide(false)
}
}

useEffect(()=>{
  savedCallback.current = compare;
})

useEffect(()=>{
  getMeetups()

  const tick = ()=>{
savedCallback.current()
  }
  
  setInterval(tick, 10000)
}, [])

  return (
  <div>
     <Box w='1100px' mx='auto'>
     <TopBar route={'Meetups'}/>
    <Box id='lvl-one'>
    {show === true && <>{inputSwap === false && <MeetupCreate refresh={getMeetups} user={user} showSwitch={showSwitch}/>} </>}
    {show === false && <>{moreInfo === false && <MeetupList buttonCheck={buttonCheck} refresh={getMeetups} createSwapUpdateCheck={createSwapUpdate} user={user} yours={yourMeetups} pub={publicMeetups} join={joinedMeetups} showSwitch={showSwitch}/>}</>}
    {hide === false && <>{inputSwap === false && <>{moreInfo === false &&  <>{buttonHide === false && <Button id='g-button' left={show === false ? "1000px" : '920px'} onClick={()=>{showSwitch()}}>{makeStatus === 'your meetups' ? makeStatus : (<AddIcon/>)}</Button>}</>} </>} </>}
    {show === false && <>{moreInfo === true && <MeetupCard card={cardInfo} showSwitch={showSwitch} refresh={getMeetups} user={user}/>}</>}
    </Box>
    </Box>
    </div>)
};

export default Meetup;
