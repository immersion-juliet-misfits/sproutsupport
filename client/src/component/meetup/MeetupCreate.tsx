import { Input, Button, Box } from '@chakra-ui/react';
import axios from 'axios';
import React, {useState, useEffect} from 'react'

const MeetupCreate = ({refresh}: {refresh: any}) => {
  const [dateTime, setDateTime] = useState('')
  const [location, setLocation] = useState('')
  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [fillIn, setFillIn] = useState(false)

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

  useEffect(()=>{
    if(dateTime[2] === '/' && dateTime[5] === '/' && dateTime[10] === ' ' && dateTime[12] === ':' && dateTime[15] === ' '){
      if(dateTime[16] + dateTime[17] === 'pm' || dateTime[16] + dateTime[17] === 'am'){
        if(location.length > 0 && eventName.length > 0 && description.length > 0 && image.length > 0 ){
          setFillIn(true)
        }else{
            setFillIn(false)
          }
      }else{
        setFillIn(false)
      }
    }else{
 setFillIn(false)
    }

  },[edit])

  return (<div>
    {fillIn === true && <Button colorScheme="green" onClick={()=>{makeMeetup()}}>create</Button>}
    {fillIn === false && <Button colorScheme="red" onClick={()=>{alert('fill in all inputs and for time reference the clock')}}>can't create</Button>}
    <Box w={"500px"}>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='dt' placeholder='mm/dd/year h:mm am/pm'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='l' placeholder='fill in location'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='en' placeholder='fill in eventName'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='d' placeholder='fill in description'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='img' placeholder='fill in imageUrl'></Input>
    </Box>
  </div>)
};

export default MeetupCreate;