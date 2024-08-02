import MeetupListItem from './MeetupListItem'
import axios from 'axios';
import React, {useState} from 'react'
import { Input, Button, SimpleGrid, Box } from '@chakra-ui/react';

const MeetupList = ({list, refresh, createSwapUpdateCheck}: {list: Array<T>, refresh: any, createSwapUpdateCheck: any}) =>{
  const [swap, setSwap] = useState('none')
  const [id, setId] = useState(0)
  const [dateTime, setDateTime] = useState('')
  const [location, setLocation] = useState('')
  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  const edit = (name: string, value: string): void =>{
    switch(name){
      case 'dt':
      setDateTime(value)
      break;
      case 'l':
      setLocation(value)
      break;
      case 'en':
      setEventName(value)
      break;
      case 'd':
      setDescription(value)
      break;
      case 'img':
      setImage(value)
      break;
    }
  }

const meetupUpdate = (): void =>{
const obj: object = {time_date: dateTime, location, eventName, description, imageUrl: image, id}
const url = 'meetup/update/' + id
axios.patch(url, obj)
.then(()=>{
  refresh()
  meetupSwap({})
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
    setId(event.id)
    setDateTime(event.time_date)
    setLocation(event.location)
    setDescription(event.description)
    setImage(event.imageUrl)
    setEventName(event.eventName)
  setSwap('update')
  }else{
    createSwapUpdateCheck()
  setSwap('none')
  }
}

  return(
    <>
    
    {/* <Button onClick={()=>{meetupDelete(10)}}>delete</Button> */}
        <SimpleGrid columns={3} spacing={10}>
        {swap === 'none' && <>{list.map((group, i)=>{return(<MeetupListItem key={i} group={group} remove={meetupDelete} swap={meetupSwap} createSwapUpdate={createSwapUpdateCheck}/>)})}</>}
        </SimpleGrid>
    {swap === 'update' && <><Box>
      <Button onClick={()=>{meetupUpdate()}}>confirm update</Button>
      <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='dt' value={dateTime}></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='l' value={location}></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='en' value={eventName}></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='d' value={description}></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='img' value={image}></Input></Box></>}
    </>
  )
} 

export default MeetupList