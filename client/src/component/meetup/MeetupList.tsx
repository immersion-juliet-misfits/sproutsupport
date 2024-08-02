import MeetupListItem from './MeetupListItem'
import axios from 'axios';
import React, {useState} from 'react'
import { Input, Button, SimpleGrid } from '@chakra-ui/react';

const MeetupList = ({list, refresh}: {list: Array<T>, refresh: any}) =>{
  const [swap, setSwap] = useState('none')
  const [meetupChange, setMeetupChange] = useState({})

const meetupUpdate = (obj: object): void =>{
const {time_date, location, eventName, description, imageUrl, id}: {time_date: string, location: string, eventName: string, description: string, imageUrl: string, id: number} = obj
const url = 'meetup/update/' + id
axios.patch(url, {eventName, location, time_date, imageUrl, description})
.then(()=>{
  refresh()
})
.catch((err: any)=>{
  console.error('Error can\'t update: ', err)
})
}

const meetupDelete = (id: number): void =>{
  const url = 'meetup/delete/' + id
  axios.delete(url)
  .then(()=>{
    refresh()
  })
  .catch((err: any)=>{
    console.error('Error can\'t update: ', err)
  })
}

const meetupSwap = (event: object): void =>{
  if(swap === 'none'){
    setMeetupChange(event)
  setSwap('update')
  }else{
  setSwap('none')
  }
}

  return(
    <>
    {/* <Button onClick={()=>{meetupUpdate({time_date: 'update', location: 'update', eventName: 'update', description: 'update', imageUrl: 'update', id: 11})}}>update</Button>
    <Button onClick={()=>{meetupDelete(10)}}>delete</Button> */}
        <SimpleGrid columns={3} spacing={10}>
        {swap === 'none' && <>{list.map((group, i)=>{return(<MeetupListItem group={group} index={i} remove={meetupDelete} swap={meetupSwap}/>)})}</>}
        </SimpleGrid>
    {swap === 'update' && <><div></div></>}
    </>
  )
} 

export default MeetupList