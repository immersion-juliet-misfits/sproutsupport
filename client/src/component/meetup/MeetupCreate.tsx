import { Input } from '@chakra-ui/react';
import React, {useState} from 'react'

const MeetupCreate = () => {
  const [dateTime, setDateTime] = useState('')
  const [location, setLocation] = useState('')
  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  const edit = (name: string, value: string) =>{
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
    console.log(dateTime, location, eventName, description, image)
  }

  return (<div>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='dt' placeholder='fill in date/time'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='l' placeholder='fill in location'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='en' placeholder='fill in eventName'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='d' placeholder='fill in description'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='img' placeholder='fill in imageUrl'></Input>
  </div>)
};

export default MeetupCreate;