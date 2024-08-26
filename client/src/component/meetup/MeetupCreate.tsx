import { Input, Button, Box, Center, Select, useToast, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {AddIcon} from '@chakra-ui/icons'

const MeetupCreate = ({refresh, user, showSwitch}: {refresh: any, user: object, showSwitch: any}) => {
  const [dateTime, setDateTime] = useState('')
  const [location, setLocation] = useState('')
  const [city, setCity] = useState('')
  const [st, setSt] = useState('')
  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState({})
  const [fillIn, setFillIn] = useState(false)
  const [weather, setWeather] = useState([])
  const [selecDate, setSelecDate] = useState('')
  const toast = useToast()
  const [warn, setWarn] = useState('warning')
  const [warnMessage, setWarnMessage] = useState('city and state exist')

  const edit = (name: string, value: React.ChangeEvent<HTMLInputElement>): void =>{
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
      case 'c':
      setCity(value)
      break;
      case 's':
      setSt(value)
      break;
    }
  }

  const makeMeetup = (): void =>{
if(image.name !== undefined){
  const combine = `Location: ${location}\n, State: ${st}\n, City: ${city}`
  axios.get('/upload/url', { params: {filename: image.name}})
  .then(({data}) => {
    return axios.put(data, image, {
      headers: {'Content-Type': image.type}
    })
  })
  .then(() => {
    axios.post('/meetup/create', {time_date: dateTime, location: combine, eventName, description, imageUrl: `https://sprout-support.s3.amazonaws.com/${image.name}`, userId: user.id, status: 'none'})
    .then(()=>{
     refresh()
     showSwitch()
    })
    .catch((err)=>{
     toast({
        title: 'Can\'t schedule meetup',
        description: "Error some thing went wrong",
        duration: 5000,
        isClosable: true,
        status: "error",
        position: 'top'
      })
      console.error("Error can/'t schedule meetup: ", err)
    })
  })
  .catch((err) => {
    toast({
      title: 'Can\'t schedule meetup',
      description: "Error some thing went wrong",
      duration: 5000,
      isClosable: true,
      status: "error",
      position: 'top'
    })
    console.error('Failed to get image url', err)
  })

  }else{  
    toast({
    title: 'missing data',
    description: "please add image",
    duration: 5000,
    isClosable: true,
    status: "error",
    position: 'top'
  })
    console.error('No image added Can\'t create')
  }
  }

  const getweather = (): void => {
    if(city.length >= 4 && st.length >= 4){
    axios.get(`/meetup/weather?city=${city}&state=${st}`)
    .then(({data})=>{
      setWeather(data.days)
      setWarnMessage('city and state exist')
      setWarn('success')
    })
    .catch((err)=>{
      setWarnMessage('pleas fill in both city and state')
     setWarn('')
    })
  }else{
    setWarn('error')
  }
  }

  const selectedDate = (target: string): void =>{
    target = target.slice(6)
for(let i = 0; i < weather.length; i++){
  let arr = weather?.[i].datetime.split('-')
       const month = arr[2]
       arr[2] = arr[1]
       arr[1] = month
       arr.reverse()
       arr = arr.join('/')
   if(arr === target){
    setSelecDate(weather?.[i].description)
   }
}
  }

  useEffect(()=>{
    if(dateTime[2] === '/' && dateTime[5] === '/' && dateTime[10] === ' ' && dateTime[13] === ':' && dateTime[16] === ' '){
      if(dateTime[17] + dateTime[18] === 'pm' || dateTime[17] + dateTime[18] === 'am'){
        if(location.length > 0 && eventName.length > 0 && description.length > 0 && image.name !== undefined ){
          setFillIn(false)
        }else{
            setFillIn(true)
          }
      }else{
        setFillIn(true)
      }
    }else{
 setFillIn(true)
    }
  },[edit])

  return (<div>
    <Button onClick={()=>{getweather()}}>weather check</Button>
 <Button colorScheme="green" onClick={()=>{makeMeetup()}} isDisabled={fillIn}><AddIcon/></Button>
 
  <Center>
    <Box w={"500px"} bg={'green.100'}>
    <Select placeholder='Select date' w={'500px'} onChange={(e)=>{selectedDate(e.target.value)}}>{weather.map((day, i)=>{
       let arr = day.datetime.split('-')
       const month = arr[2]
       arr[2] = arr[1]
       arr[1] = month
       arr.reverse()
       arr = arr.join('/')
return(<option key={i}>date: {arr}</option>)
      })}</Select>
<div>{selecDate}</div>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='dt' placeholder='mm/dd/year h:mm am/pm'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='l' placeholder='location'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )
      getweather()
    }} name='c' placeholder='city'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )
      getweather()
    }} name='s' placeholder='state'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='en' placeholder='event Name'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='d' placeholder='description'></Input>
    <Input type="file" onChange={(e)=>{edit(e.target.name, e.target.files[0] )}} name='img' id='choose image'></Input>
    </Box>
    </Center>
    {warn !== '' && 
    <Alert status={warn}>
  <AlertIcon />
  <AlertDescription>{warn === 'error' ? 'city or state don\'t exist' : warnMessage}</AlertDescription>
</Alert>
}
  </div>)
};

export default MeetupCreate;