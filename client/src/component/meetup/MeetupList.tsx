import MeetupListItem from './MeetupListItem'
import axios from 'axios';
import React, {useState} from 'react'
import { Input, Button } from '@chakra-ui/react';

const MeetupList = ({list, refresh}: {list: Array<T>, refresh: any}) =>{
  const [swap, setSwap] = useState('none')

const meetupUpdate = (obj: object): void =>{
const {time_date, location, eventName, description, imageUrl, id}: {time_date: string, location: string, eventName: string, description: string, imageUrl: string, id: number} = obj
let url = 'meetup/update/' + id
axios.patch(url, {eventName, location, time_date, imageUrl, description})
.then(()=>{
  refresh()
})
.catch((err: any)=>{
  console.error('Error can\'t update: ', err)
})
}

const meetupDelete = (id: number): void =>{
  let url = 'meetup/delete/' + id
  axios.delete(url)
  .then(()=>{
    refresh()
  })
  .catch((err: any)=>{
    console.error('Error can\'t update: ', err)
  })
  
}

  return(
    <>
    {swap === 'none' && <>{list.map((group, i)=>{return(<MeetupListItem group={group} index={i}/>)})}</>}
    <Button onClick={()=>{meetupUpdate({time_date: 'update', location: 'update', eventName: 'update', description: 'update', imageUrl: 'update', id: 11})}}>update</Button>
    <Button onClick={()=>{meetupDelete(10)}}>delete</Button>
    </>
  )
} 

export default MeetupList