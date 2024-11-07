import { Input, Button, Box, Center, useToast, Alert, AlertIcon, AlertDescription, Image, background} from '@chakra-ui/react';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react'
import {AddIcon} from '@chakra-ui/icons'
import dayjs from 'dayjs';
import imagesExists from 'image-exists'

const MeetupCreate = ({refresh, user, showSwitch}: {refresh: void, user: object, showSwitch: void}) => {
  const [dateTime, setDateTime] = useState('')
  const [location, setLocation] = useState('')
  const [city, setCity] = useState('')
  const [st, setSt] = useState('')
  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState({})
  const [fillIn, setFillIn] = useState(false)
  const [selecDate, setSelecDate] = useState('not in range')
  const toast = useToast()
  const [warn, setWarn] = useState('warning')
  const [warnMessage, setWarnMessage] = useState('please fill in both city and state with the selected date')
  const [check, setCheck] = useState(false)
  const savedCallback = useRef()
  const [src, setSrc] = useState('')

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
      setSrc(URL.createObjectURL(value))
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
    axios.post('/meetup/create', {time_date: dateTime, location: combine, eventName, description, imageUrl: `https://ssupportbucket.s3.amazonaws.com/${image.name}`, userId: user.id, status: 'none'})
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

  }else if(image.name === undefined){  
      const combine = `Location:${location}\n, State:${st}\n, City:${city}`
    axios.post('/meetup/create', {time_date: dateTime, location: combine, eventName, description, imageUrl: 'https://sproutsupportbucket.s3.amazonaws.com/sproutsSupportLogo1.png', userId: user.id, status: 'none'})
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
  }
  }

  const getweather = (): void => {
    const time: string = dayjs().format('MM/DD/YYYY')
    if(city.length >= 4 && st.length >= 4 && dateTime.length >= 19){
    const monthCheck = (parseInt(dateTime?.[0] + dateTime?.[1]) === parseInt(time[0] + time[1]))
    const yearCheck = (parseInt(dateTime?.[6] + dateTime?.[7] + dateTime?.[8] + dateTime?.[9]) === parseInt(time[6] + time[7] + time[8] + time[9]))

    axios.get(`/meetup/weather?city=${city}&state=${st}`)
    .then(({data})=>{
      if(monthCheck === true && yearCheck === true){
        const passCheck = (parseInt(dateTime?.[3] + dateTime?.[4]) - parseInt(time[3] + time[4]))
        if(passCheck < 0){
          setSelecDate('selected date has already pass')
        }else{
        setSelecDate(selectedDate(data.days, time))
        }
      }
      setWarnMessage('city and state exist')
      setWarn('success')
    })
    .catch((err)=>{
      console.error('can\'t get weather: ' + err)
      setWarnMessage('city or state don\'t exist')
     setWarn('error')
    })
  }else{
    if(dateTime.length < 19 && city.length >= 4 && st.length >= 4){
      setWarnMessage('please fill in a date (example: 01/01/2024 1:01 am/pm)')
    }else if(dateTime.length >= 17 && city.length < 4 && st.length < 4){
      setWarnMessage('please fill in both city and state')
    }else{
    setWarnMessage('please fill in both city and state with the selected date')
    }
    setWarn('warning')
  }
  }

  const selectedDate = (arr: Array<T>, due: string): void =>{
for(let i = 0; i < arr.length; i++){
  let array = arr?.[i].datetime.split('-')
       const month = array[2]
       array[2] = array[1]
       array[1] = month
       array.reverse()
       array = array.join('/')
   if(array === due){
 return arr?.[i].description
   }
}
return 'not in range'
  }

  useEffect(()=>{
    savedCallback.current = getweather;
    imagesExists(src, (img: boolean)=>{
      if(img === true){
        setCheck(true)
      }
      })
  })

  useEffect(()=>{
    savedCallback.current()
    if(dateTime[2] === '/' && dateTime[5] === '/' && dateTime[10] === ' ' && dateTime[13] === ':' && dateTime[16] === ' '){
      if(dateTime[17] + dateTime[18] === 'pm' || dateTime[17] + dateTime[18] === 'am'){
        if(location.length > 0 && eventName.length > 0 && description.length > 0){
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
  <Center>
    <Box w={"800px"} id='g-card'>
    {check === true && <Image objectFit={'fill'} src={src} h={"150px"} w={"470px"} mx={"170px"}></Image>}
      <Box h={'40px'} className="g-font">{'weather: ' + selecDate}</Box>
    <Input className="g-font-p" id="g-input" onChange={(e)=>{edit(e.target.name, e.target.value )
      getweather()
    }} name='dt' placeholder='mm/dd/year h:mm am/pm'></Input>
    <Input className="g-font-p" id="g-input" onChange={(e)=>{edit(e.target.name, e.target.value )}} name='l' placeholder='location'></Input>
    <Input className="g-font-p" id="g-input" onChange={(e)=>{edit(e.target.name, e.target.value )
      getweather()
    }} name='c' placeholder='city'></Input>
    <Input className="g-font-p" id="g-input" onChange={(e)=>{edit(e.target.name, e.target.value )
      getweather()
    }} name='s' placeholder='state'></Input>
    <Input className="g-font-p" id="g-input" onChange={(e)=>{edit(e.target.name, e.target.value )}} name='en' placeholder='event Name'></Input>
    <Input className="g-font-p" id="g-input" onChange={(e)=>{edit(e.target.name, e.target.value )}} name='d' placeholder='description'></Input>
    <Input className="g-font-p" id="g-input" type="file" onChange={(e)=>{edit(e.target.name, e.target.files[0] )}} name='img' id='choose image'></Input>
    {warn !== '' && 
    <Alert status={warn}>
  <AlertIcon />
  <AlertDescription className="g-font">{warn === 'error' ? 'city or state don\'t exist' : warnMessage}</AlertDescription>
</Alert>
}
    </Box>
    </Center>
    <Button id='g-button' onClick={()=>{makeMeetup()}} isDisabled={fillIn} position='relative' left="875px" top="-368px"><AddIcon/></Button>
    {/* <Box position="relative" left='360px' top="-410px" w={'450px'}>{selecDate}</Box> */}
  </div>)
};

export default MeetupCreate;
