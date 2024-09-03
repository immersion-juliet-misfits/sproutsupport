import MeetupListItem from './MeetupListItem'
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Input, Button, SimpleGrid, Box, useToast, Alert, AlertIcon, AlertDescription, Center, Select } from '@chakra-ui/react';

const MeetupList = ({refresh, createSwapUpdateCheck, user, yours, pub, join, showSwitch}: {refresh: any, createSwapUpdateCheck: any, user: object, yours: Array<T>, pub: Array<T>, join: Array<T>, showSwitch: void}) =>{
  const [swap, setSwap] = useState('none')
  const [id, setId] = useState(0)
  const [dateTime, setDateTime] = useState('')
  const [location, setLocation] = useState('')
  const [city, setCity] = useState('')
  const [st, setSt] = useState('')
  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState({})
  const [currentState, setCurrentState] = useState('yours')
  const [fillIn, setFillIn] = useState(false)
  const toast = useToast()
  const [warn, setWarn] = useState('warning')
  const [warnMessage, setWarnMessage] = useState('please fill in both city and state')
  const [selecDate, setSelecDate] = useState('')
  const [weather, setWeather] = useState([])

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
    console.log(combine)
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
  meetupSwap({})
})
.catch((err: any)=>{
  toast({title: 'Can\'t update', description: "Error some thing went wrong", duration: 5000, isClosable: true, status: "error", position: 'top'
  })
  console.error('Error can\'t update: ', err)
})
 })
 .catch((err: any)=>{
  toast({ title: 'Can\'t update', description: "Error some thing went wrong", duration: 5000, isClosable: true, status: "error", position: 'top'
  })
  console.error('Error can\'t update: ', err)
})
  }else{
    const combine = `Location: ${location}\n, State: ${st}\n, City: ${city}`
    console.log(combine)
    const obj: object = {time_date: dateTime, location: combine, eventName, description, imageUrl: 'https://sproutsupportbucket.s3.amazonaws.com/sproutsSupportLogo1.png', id}
    const url = 'meetup/update/' + id
    axios.patch(url, obj)
    .then(()=>{
      refresh()
      meetupSwap({})
    })
    .catch((err: any)=>{
      toast({title: 'Can\'t update', description: "Error some thing went wrong", duration: 5000, isClosable: true, status: "error", position: 'top'
      })
      console.error('Error can\'t update: ', err)
    })
  }
}

const meetupDelete = (id: number): void =>{
  const url = 'meetup/delete/' + id
  axios.delete(url)
  .then(()=>{
    refresh()
  })
  .catch((err: any)=>{
    toast({
      title: 'Can\'t delete',
      description: "Error some thing went wrong",
      duration: 5000,
      isClosable: true,
      status: "error",
      position: 'top'
    })
    console.error('Error can\'t delete: ', err)
  })
}

const meetupSwap = (event: object): void =>{
  if(swap === 'none'){
    setId(event.id)
    setDateTime(event.time_date)
    const arr = event.location.split('\n')
    for(let i = 0; i < arr.length; i++){
      arr[i] = arr[i].split(':')
    }
    setLocation(arr[0][1])
    setCity(arr[2][1])
    setSt(arr[1][1])
    setDescription(event.description)
    setImage(event.imageUrl)
    setEventName(event.eventName)
  setSwap('update')
  }else{
    createSwapUpdateCheck()
  setSwap('none')
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
   setWarnMessage('city or state don\'t exist')
   setWarn('error')
  })
}else{
  setWarnMessage('pleas fill in both city and state')
  setWarn('warning')
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

  return(
    <>
     {swap === 'none' && <><Box bg={"#6EB257"} position="relative" top="-40px" h={'60px'}>
       <Button bg={"#C5E063"} isActive={currentState === 'yours' ? false : true} onClick={()=>{currentState !== 'yours' ? setCurrentState('yours') : 'none'}} top="10px" left="195px">yours</Button>
     <Button bg={"#C5E063"} isActive={currentState === 'joined' ? false : true} onClick={()=>{currentState !== 'joined' ? setCurrentState('joined') : 'none'}} top="10px" left="436px">joined</Button>
     <Button bg={"#C5E063"} isActive={currentState === 'public' ? false : true} onClick={()=>{currentState !== 'public' ? setCurrentState('public') : 'none'}} top="10px" left="680px">public</Button>
    </Box>
     <Center>
     <SimpleGrid position="relative" top="-38px" columns={3} spacing={4} w={'940px'} >
      <>{currentState === 'yours' && yours.map((group, i)=>{
         group.isJoined = false
        return(<MeetupListItem key={i} user={user} group={group} remove={meetupDelete} swap={meetupSwap} createSwapUpdate={createSwapUpdateCheck} isJoined={false} refresh={refresh} showSwitch={showSwitch}/>)})}</>
      <>{currentState === 'joined' && join.map((group, i)=>{
        group.isJoined = true
        return(<MeetupListItem key={i} user={user} group={group} remove={meetupDelete} swap={meetupSwap} createSwapUpdate={createSwapUpdateCheck} isJoined={true} refresh={refresh} showSwitch={showSwitch}/>)
        })}</>
      <>{currentState === 'public' && pub.map((group, i)=>{
         group.isJoined = false
        return(<MeetupListItem key={i} user={user} group={group} remove={meetupDelete} swap={meetupSwap} createSwapUpdate={createSwapUpdateCheck} isJoined={false} refresh={refresh} showSwitch={showSwitch}/>)})}</>
    </SimpleGrid>
    </Center>
    <>{currentState === 'joined' && <>{join.length === 0 && <Alert status={'warning'}><AlertIcon/><AlertDescription>you don't have any meetups you planing to join</AlertDescription></Alert>}</>}</>
    <>{currentState === 'yours' && <>{yours.length === 0 && <Alert status={'warning'}><AlertIcon/><AlertDescription>you don't have any meetup events</AlertDescription></Alert>}</>}</>
     </>}
    {swap === 'update' && <Center><Box w={'800px'} bg={"#C5E063"}>
    <Button bg={"#4AAD52"} onClick={()=>{
      setSwap('none')
      createSwapUpdateCheck()
      }}>Cancel Update</Button>
       <Button bg={"#4AAD52"} onClick={()=>{
        meetupUpdate()
        refresh()
        refresh()
        }} isDisabled={fillIn} >Confirm Update</Button>
   
      <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='dt' value={dateTime}></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='l' value={location}></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )
      getweather()
    }} name='c' placeholder='city'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )
      getweather()
    }} name='s' placeholder='state'></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='en' value={eventName}></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='d' value={description}></Input>
  <Input type="file" onChange={(e)=>{edit(e.target.name, e.target.files[0] )}} name='img'></Input>
    {warn !== '' && 
    <Alert status={warn}>
  <AlertIcon />
  <AlertDescription>{warn === 'error' ? 'city or state don\'t exist' : warnMessage}</AlertDescription>
</Alert>
}
    </Box></Center>}
    {swap === 'update' &&  <Box position="relative" left='360px' top="-362px">{selecDate}</Box>}
    </>
  )
}

export default MeetupList