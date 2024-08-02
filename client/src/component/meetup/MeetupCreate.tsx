import { Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import React, {useState} from 'react'

const MeetupCreate = ({refresh}: {refresh: any}) => {
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

  const makeMeetup = (): void =>{
    axios.post('/meetup/create', {time_date: dateTime, location, eventName, description, imageUrl: image})
    .then(()=>{
     refresh()
    })
    .catch((err)=>{
      console.error("Error can/'t schedule meetup: ", err)
    })
  }

  return (<div>
    <Button onClick={()=>{makeMeetup()}}>create</Button>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='dt' placeholder='fill in date/time'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='l' placeholder='fill in location'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='en' placeholder='fill in eventName'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='d' placeholder='fill in description'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='img' placeholder='fill in imageUrl'></Input>
  </div>)
};

export default MeetupCreate;