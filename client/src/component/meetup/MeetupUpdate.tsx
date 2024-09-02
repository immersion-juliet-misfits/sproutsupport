import {Box, Button, Center, Image, Input, Card, CardBody, Alert, AlertIcon, AlertDescription, useToast } from "@chakra-ui/react"
import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios';
import imagesExists from 'image-exists'
import {AddIcon} from '@chakra-ui/icons'
import dayjs from 'dayjs';

const MeetupUpdate = ({event, refresh, showSwitch}: {event: object, refresh: any, showSwitch: any}): void =>{
  const savedCallback = useRef()
  const toast = useToast()
  const [check, setCheck] = useState(false)
  const [fillIn, setFillIn] = useState(false)
  const [selecDate, setSelecDate] = useState('not in range')
  const [warn, setWarn] = useState('warning')
  const [warnMessage, setWarnMessage] = useState('please fill in both city and state with the selected date')
  const [id, setId] = useState(event.id)
  const [dateTime, setDateTime] = useState('')
  const [location, setLocation] = useState('')
  const [city, setCity] = useState('')
  const [st, setSt] = useState('')
  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState({name: event.imageUrl})

  const edit = (name: string, value: any): void =>{
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

  const meetupUpdate = (): void =>{
    if(image.name !== undefined){
      const combine = `Location:${location}\n, State:${st}\n, City:${city}`
    axios.get('/upload/url', { params: {filename: image.name}})
    .then(({data}) => {
      return axios.put(data, image, {
        headers: {'Content-Type': image.type}
      })
    }).then(()=>{
  const obj: object = {time_date: dateTime, location: combine, eventName, description, imageUrl: `https://sproutsupportbucket.s3.amazonaws.com/${image.name}`, id}
  const url = 'meetup/update/' + id
  axios.patch(url, obj)
  .then(()=>{
    refresh()
    showSwitch(false, {})
  })
  .catch((err: any)=>{
    toast({title: 'Can\'t update', description: "Error some thing went wrong", duration: 5000, isClosable: true, status: "error", position: 'top'
    })
    console.error('Error can\'t update line 69: ', err)
  })
   })
   .catch((err: any)=>{
    toast({ title: 'Can\'t update', description: "Error some thing went wrong", duration: 5000, isClosable: true, status: "error", position: 'top'
    })
    console.error('Error can\'t update  line 75: ', err)
  })
    }else{
      const combine = `Location: ${location}\n, State: ${st}\n, City: ${city}`
      const obj: object = {time_date: dateTime, location: combine, eventName, description, imageUrl: 'https://sproutsupportbucket.s3.amazonaws.com/sproutsSupportLogo1.png', id}
      const url = 'meetup/update/' + id
      axios.patch(url, obj)
      .then(()=>{
        refresh()
        showSwitch(false, {})
      })
      .catch((err: any)=>{
        toast({title: 'Can\'t update', description: "Error some thing went wrong", duration: 5000, isClosable: true, status: "error", position: 'top'
        })
        console.error('Error can\'t update: ', err)
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
    imagesExists(event.imageUrl, (img: boolean)=>{
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


  return(<Card>
    <CardBody bg={"#C5E063"} w={"450px"}>
    <Box bg={"#6EB257"} h={"60px"} >{'weather: ' + selecDate}<Button h={"25px"} bg={"#C5E063"} color={"#6EB257"} onClick={()=>{meetupUpdate()}} isDisabled={fillIn} left={"210px"} top={"5px"}><AddIcon/></Button></Box>
   {check === true && <Center><Image objectFit={'fill'} src={image.name[0] === 'h' ? image.name : URL.createObjectURL(image)} h={"150px"} w={"470px"}></Image></Center>}
   <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='dt' placeholder="mm/dd/year h:mm am/pm"></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='l' placeholder="location"></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )
      getweather()
    }} name='c' placeholder="city"></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )
     getweather()
    }} name='s' placeholder="state"></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='en' placeholder="eventName"></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='d' placeholder="description"></Input>
  <Input type="file" accept="image/*" onChange={(e)=>{edit(e.target.name, e.target.files[0] )}} name='img'></Input>
  <Alert status={warn}>
  <AlertIcon />
  <AlertDescription>{warn === 'error' ? 'city or state don\'t exist' : warnMessage}</AlertDescription>
</Alert>
  </CardBody>
  </Card>
  )
}

export default MeetupUpdate 