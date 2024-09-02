import { Box, Button, Center, Image, Toast, SimpleGrid, Card, CardBody } from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import React, {useEffect, useState} from 'react'
import MeetupUpdate from "./MeetupUpdate"
import imagesExists from 'image-exists'
import axios from 'axios';

const MeetupCard = ({card, showSwitch, refresh, user}: {card: object,  showSwitch: void, refresh: any, user: object}): void =>{
  const [check, setCheck] = useState(false)
  const [updateSwap, setUpdateSwap] = useState(false)

  const joinMeetup = (): void =>{
    axios.post('meetup/AttendeeCreate',{userId: user.id, meet_id: card.id})
    .then(()=>{
      refresh()
      showSwitch(false, {})
    })
    .catch((err)=>{
      toast({title: 'Can\'t join', description: "Error some thing went wrong", duration: 5000, isClosable: true, position: 'top'})
      console.error('cant\'t join: ', err)
    })
    }
    
    const leaveMeetup = (): void =>{
      axios.get('/meetup/Attendee')
      .then((result)=>{
        let meetTest: number = 0
        const arr = result.data
    for(let i = 0; i < arr.length; i++){
      if(arr[i].userId === user.id && arr[i].meet_id === card.id){
    meetTest = arr[i].id
      } 
    }
    const url = `meetup/AttendeeLeave/${meetTest}`
    axios.delete(url)
    .then(()=>{
      refresh()
      showSwitch(false, {})
    })
    .catch((err)=>{
      toast({title: 'Can\'t leave', description: "Error some thing went wrong", duration: 5000, isClosable: true, status: "error", position: 'top'})
      console.error('cant\'t join: ', err)
    })
    })
    .catch((err)=>{
      toast({title: 'Can\'t leave', description: "Error some thing went wrong", duration: 5000, isClosable: true, status: "error", position: 'top'})
      console.error('cant\'t find Attende for this meetUp: ', err)
    })
      }

  const meetupDelete = (id: number): void =>{
    const url = 'meetup/delete/' + id
    axios.delete(url)
    .then(()=>{
      refresh()
      showSwitch(false, {})
    })
    .catch((err: any)=>{
      toast({ title: 'Can\'t delete', description: "Error some thing went wrong", duration: 5000, isClosable: true, status: "error", position: 'top'})
      console.error('Error can\'t delete: ', err)
    })
  }

  useEffect(()=>{
    imagesExists(card.imageUrl, (img: boolean)=>{
      if(img === true){
        setCheck(true)
      }
    })
  },[])

  return(<>
  <Center><Button bg={"#C5E063"} mx={"20px"} onClick={()=>{showSwitch(false, {})}}>go back</Button></Center>
  <SimpleGrid mt={'30px'} position="relative" top="-38px" columns={2} spacing={80} w={'940px'} >
  <Card bg={"#C5E063"} w={'470px'} h={'425px'} mx={"20px"}>
    <CardBody>
  {check === true && <Center><Image p={"15px"} objectFit={'fill'} src={card.imageUrl} h={"180px"} w={"405px"}></Image></Center>}
<Center><Box bg={"#6EB257"} w={"380px"} >
<div><Center><b>{card.eventName}</b></Center></div>
  <b>{card.location}</b>
<div>{'starts at ' + card.time_date}</div>
<div>{'time left: ' + (card.timeleft !== undefined ? card.timeleft : 'calculating')}</div>
<div>will be deleted after 1 hour has pass the due date</div>
<div><b>Description:</b>{' ' + card.description}</div>
</Box></Center>
{user.id === card.userId && <>
<Button position={"absolute"} left={"370px"} top={"40px"} bg={"#6EB257"} onClick={()=>{meetupDelete(card.id)}}><DeleteIcon/></Button>
<Button position={"absolute"}  left={"370px"} top={"80px"} bg={"#6EB257"} onClick={()=>{updateSwap ? setUpdateSwap(false) : setUpdateSwap(true)}}><EditIcon/></Button>
</>}
</CardBody>
</Card>
{card.userId !== user.id && <>
{card.isJoined === false && <Button position={"absolute"} left={"70px"} top={"40px"} bg={"#C5E063"} onClick={()=>{joinMeetup()}}>Join</Button>}
{card.isJoined === true && <Button position={"absolute"} left={"70px"} top={"40px"} bg={"#C5E063"} onClick={()=>{leaveMeetup()}}>Leave</Button>}
</>}
{updateSwap === true && <Box><MeetupUpdate event={card} refresh={refresh} showSwitch={showSwitch}/></Box>}
</SimpleGrid>
  </>)
}

export default MeetupCard