import MeetupListItem from './MeetupListItem'
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Input, Button, SimpleGrid, Box } from '@chakra-ui/react';

const MeetupList = ({refresh, createSwapUpdateCheck, user, yours, pub, join}: {refresh: any, createSwapUpdateCheck: any, user: object, yours: Array<T>, pub: Array<T>, join: Array<T>}) =>{
  const [swap, setSwap] = useState('none')
  const [id, setId] = useState(0)
  const [dateTime, setDateTime] = useState('')
  const [location, setLocation] = useState('')
  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState({})
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
    }
  }

const meetupUpdate = (): void =>{
  axios.get('/upload/url', { params: {filename: image.name}})
  .then(({data}) => {
    return axios.put(data, image, {
      headers: {'Content-Type': image.type}
    })
  }).then(()=>{
const obj: object = {time_date: dateTime, location, eventName, description, imageUrl: `https://sproutsupportbucket.s3.amazonaws.com/${image.name}`, id}
const url = 'meetup/update/' + id
axios.patch(url, obj)
.then(()=>{
  refresh()
  meetupSwap({})
})
.catch((err: any)=>{
  console.error('Error can\'t update: ', err)
})
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
    console.error('Error can\'t delete: ', err)
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

// const check = (): void =>{
// const checkList: Array<T> = []
// const edit: Array<T> = []
// for(let i = 0; i < join.length; i++){
//   if(!checkList.includes(join?.[i])){
//     checkList.push(join?.[i])
//   }
// }
// for(let i = 0; i < pub.length; i++){
//   if(!checkList.includes(pub?.[i].id)){
//     edit.push(pub?.[i])
//   }
// }
// }

// useEffect(()=>{
//   check()
// },[])
useEffect(()=>{
  if(dateTime[2] === '/' && dateTime[5] === '/' && dateTime[10] === ' ' && dateTime[13] === ':' && dateTime[16] === ' '){
    if(dateTime[17] + dateTime[18] === 'pm' || dateTime[17] + dateTime[18] === 'am'){
      if(location.length > 0 && eventName.length > 0 && description.length > 0 && image.name !== undefined ){
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


  return(
    <>
     {swap === 'none' && <><Button onClick={()=>{currentState !== 'yours' ? setCurrentState('yours') : 'none'}} top="-80px" left="175px">yours</Button></>}
     {swap === 'none' && <><Button onClick={()=>{currentState !== 'joined' ? setCurrentState('joined') : 'none'}} top="-80px" left="178px">joined</Button></>}
     {swap === 'none' && <><Button onClick={()=>{currentState !== 'public' ? setCurrentState('public') : 'none'}} top="-80px" left="180px">public</Button></>}
        <SimpleGrid columns={3} spacing={10}>
        {swap === 'none' && <><>{currentState === 'yours' && yours.map((group, i)=>{return(<MeetupListItem key={i} user={user} group={group} remove={meetupDelete} swap={meetupSwap} createSwapUpdate={createSwapUpdateCheck} isJoined={false} refresh={refresh}/>)})}</></>}
        {swap === 'none' && <><>{currentState === 'joined' && join.map((group, i)=>{
          return(<MeetupListItem key={i} user={user} group={group} remove={meetupDelete} swap={meetupSwap} createSwapUpdate={createSwapUpdateCheck} isJoined={true} refresh={refresh}/>)
          })}</></>}
        {swap === 'none' && <><>{currentState === 'public' && pub.map((group, i)=>{return(<MeetupListItem key={i} user={user} group={group} remove={meetupDelete} swap={meetupSwap} createSwapUpdate={createSwapUpdateCheck} isJoined={false} refresh={refresh}/>)})}</></>}
        </SimpleGrid>
    {swap === 'update' && <><Box w={'500px'}>
      {fillIn === true && <Button onClick={()=>{meetupUpdate()}}>confirm update</Button>}
      {fillIn === false && <Button colorScheme="red" onClick={()=>{alert('fill in all inputs and for time reference the clock')}}>can't create</Button>}
      <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='dt' value={dateTime}></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='l' value={location}></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='en' value={eventName}></Input>
    <Input onChange={(e)=>{edit(e.target.name, e.target.value )}} name='d' value={description}></Input>
    <Input type="file" onChange={(e)=>{edit(e.target.name, e.target.files[0] )}} name='img'></Input>
    </Box></>}
    </>
  )
} 

export default MeetupList