import {Button, Card, CardHeader, CardBody, Image, Center, useToast, Box} from '@chakra-ui/react';
import axios from 'axios';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import React, {useEffect, useState} from 'react'
import imagesExists from 'image-exists'

const MeetupListItem = ({group, remove, swap, createSwapUpdate, user, isJoined, refresh, showSwitch}: {group: object, remove: any, swap: any, createSwapUpdate: any, user: object, isJoined: boolean, refresh: any, showSwitch: void}) => {
const toast = useToast
const [check, setCheck] = useState(false)

// const joinMeetup = (): void =>{
// axios.post('meetup/AttendeeCreate',{userId: user.id, meet_id: group.id})
// .then(()=>{
//   refresh()
// })
// .catch((err)=>{
//   toast({
//     title: 'Can\'t join',
//     description: "Error some thing went wrong",
//     duration: 5000,
//     isClosable: true,
//     position: 'top'
//   })
//   console.error('cant\'t join: ', err)
// })
// }

// const leaveMeetup = (): void =>{
//   axios.get('/meetup/Attendee')
//   .then((result)=>{
//     let meetTest: number = 0
//     const arr = result.data
// for(let i = 0; i < arr.length; i++){
//   if(arr[i].userId === user.id && arr[i].meet_id === group.id){
// meetTest = arr[i].id
//   } 
// }
// const url = `meetup/AttendeeLeave/${meetTest}`
// axios.delete(url)
// .then(()=>{
//   refresh()
// })
// .catch((err)=>{
//   toast({
//     title: 'Can\'t leave',
//     description: "Error some thing went wrong",
//     duration: 5000,
//     isClosable: true,
//     status: "error",
//     position: 'top'
//   })
//   console.error('cant\'t join: ', err)
// })
// })
// .catch((err)=>{
//   toast({
//     title: 'Can\'t leave',
//     description: "Error some thing went wrong",
//     duration: 5000,
//     isClosable: true,
//     status: "error",
//     position: 'top'
//   })
//   console.error('cant\'t find Attende for this meetUp: ', err)
// })
//   }

useEffect(()=>{
  imagesExists(group.imageUrl, (img: boolean)=>{
    if(img === true){
      setCheck(true)
    }
  })
},[])

  return(<div>
    <Card id="g-card">
    <CardBody >
    {check === true && <Image mx={"auto"} objectFit={'fill'} src={group.imageUrl} h={"150px"} w={"430px"}></Image>}
    {check === false && <Image mx={"auto"} objectFit={'fill'} src={'https://sproutsupportbucket.s3.us-east-2.amazonaws.com/sproutsSupportLogo1.jpg'} h={"150px"} w={"430px"}></Image>}
      <CardHeader bg={"#6EB257"}><Center><b>{group.eventName}</b></Center></CardHeader>
      <Box id="g-box" my={"10px"}>
<div>{'starts at ' + group.time_date}</div>
<div>{'time left ' + (group.timeleft !== undefined ? group.timeleft : 'calculating')}</div>
</Box>
{user.id === group.userId && <Center>
{/* <Button bg={"#6EB257"} onClick={()=>{remove(group.id)}}><DeleteIcon/></Button>
<Button bg={"#6EB257"} onClick={()=>{
  swap(group); 
  createSwapUpdate();
  }}><EditIcon/></Button> */}
</Center>}
{/* <Center>
{group.userId !== user.id && <>{isJoined === false && <Button bg={"#6EB257"} onClick={()=>{joinMeetup()}}>Join</Button>}</>}
{group.userId !== user.id && <>{isJoined === true && <Button bg={"#6EB257"} onClick={()=>{leaveMeetup()}}>Leave</Button>}</>}
</Center> */}
<Center><Button id='g-button' onClick={()=>{showSwitch(true, group)}}>moreInfo</Button></Center>
</CardBody>
</Card>
</div>)
}

export default MeetupListItem