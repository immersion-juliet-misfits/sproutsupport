import MeetupListItem from './MeetupListItem'
import React, {useState, useEffect} from 'react'
import { Button, SimpleGrid, Box, Alert, AlertIcon, AlertDescription, Center } from '@chakra-ui/react';

const MeetupList = ({refresh, createSwapUpdateCheck, user, yours, pub, join, showSwitch, buttonCheck}: {refresh: any, createSwapUpdateCheck: any, user: object, yours: Array<T>, pub: Array<T>, join: Array<T>, showSwitch: void, buttonCheck: void}) =>{
  const [swap, setSwap] = useState('none')
  const [dateTime, setDateTime] = useState('')
  const [location, setLocation] = useState('')
  const [currentState, setCurrentState] = useState('yours')
  const [fillIn, setFillIn] = useState(false)

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
     {swap === 'none' && <><Box  position="relative" top="-40px" h={'60px'}>
       <Button className="g-font"  isActive={currentState === 'yours' ? false : true} onClick={()=>{
        currentState !== 'yours' ? setCurrentState('yours') : 'none'
        buttonCheck(false)
        }} top="25px" left="175px">yours</Button>
     <Button className="g-font" isActive={currentState === 'joined' ? false : true} onClick={()=>{
      currentState !== 'joined' ? setCurrentState('joined') : 'none'
      buttonCheck(true)
      }} top="25px" left="416px">joined</Button>
     <Button className="g-font" isActive={currentState === 'public' ? false : true} onClick={()=>{
      currentState !== 'public' ? setCurrentState('public') : 'none'
      buttonCheck(true)
      }} top="25px" left="660px">public</Button>
    </Box>
     <Center>
     <SimpleGrid position="relative" top="-30px" columns={3} spacing={4} w={'940px'} >
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
    <>{currentState === 'joined' && <>{join.length === 0 && <Alert status={'warning'}><AlertIcon/><AlertDescription className='g-font'>you don't have any meetups you planing to join</AlertDescription></Alert>}</>}</>
    <>{currentState === 'yours' && <>{yours.length === 0 && <Alert status={'warning'}><AlertIcon/><AlertDescription className='g-font'>you don't have any meetup events</AlertDescription></Alert>}</>}</>
    <>{currentState === 'public' && <>{pub.length === 0 && <Alert status={'warning'}><AlertIcon/><AlertDescription className='g-font'> there are currently no public meetUps at the moment</AlertDescription></Alert>}</>}</>
     </>}
    </>
  )
}

export default MeetupList