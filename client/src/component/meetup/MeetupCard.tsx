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
      Toast({title: 'Can\'t join', description: "Error some thing went wrong", duration: 5000, isClosable: true, position: 'top'})
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
      Toast({title: 'Can\'t leave', description: "Error some thing went wrong", duration: 5000, isClosable: true, status: "error", position: 'top'})
      console.error('cant\'t join: ', err)
    })
    })
    .catch((err)=>{
      Toast({title: 'Can\'t leave', description: "Error some thing went wrong", duration: 5000, isClosable: true, status: "error", position: 'top'})
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
      Toast({ title: 'Can\'t delete', description: "Error some thing went wrong", duration: 5000, isClosable: true, status: "error", position: 'top'})
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
  <Center><Button id='g-button' mx={"20px"} onClick={()=>{showSwitch(false, {})}}>go back</Button></Center>
  <SimpleGrid mt={'30px'} position="relative" top="-38px" columns={2} spacing={60} w={'940px'} >
  <Card id="g-card" w={'470px'} h={'425px'} mx={"20px"}>
    <CardBody>
  {check === true && <Center><Image p={"15px"} objectFit={'fill'} src={card.imageUrl} h={"180px"} w={"405px"}></Image></Center>}
<Center><Box id="g-box" w={"380px"} >
<div><Center><b>{card.eventName}</b></Center></div>
  <b>{card.location}</b>
<div>{'starts at ' + card.time_date}</div>
<div>{'time left: ' + (card.timeleft !== undefined ? card.timeleft : 'calculating')}</div>
<div>will be deleted after 1 hour has pass the due date</div>
<div><b>Description:</b>{' ' + card.description}</div>
</Box></Center>
{user.id === card.userId && <>
<Button position={"absolute"} left={"370px"} top={"40px"} id='g-button' onClick={()=>{meetupDelete(card.id)}}><DeleteIcon/></Button>
<Button position={"absolute"}  left={"370px"} top={"80px"} id='g-button' onClick={()=>{updateSwap ? setUpdateSwap(false) : setUpdateSwap(true)}}><EditIcon/></Button>
</>}
</CardBody>
</Card>
{card.userId !== user.id && <>
{card.isJoined === false && <Button className="g-font" position={"absolute"} left={"70px"} top={"40px"} id='g-button' onClick={()=>{joinMeetup()}}>Join</Button>}
{card.isJoined === true && <Button className="g-font" position={"absolute"} left={"70px"} top={"40px"} id='g-button' onClick={()=>{leaveMeetup()}}>Leave</Button>}
</>}
{updateSwap === true && <Box><MeetupUpdate event={card} refresh={refresh} showSwitch={showSwitch}/></Box>}
{updateSwap === false &&<Image p={"15px"} src={'https://sproutsupportbucket.s3.us-east-2.amazonaws.com/Peter_sprout-support_textlessIcon_copy(black).png'} position={"absolute"}
 top={"-30px"} left={"670px"} h={"400px"} w={"400px"} id="flitter-meetups-logo" ></Image>}
</SimpleGrid>
  </>)
}
//filter="invert(59%) sepia(49%) saturate(397%) hue-rotate(60deg) brightness(95%) contrast(98%);"
export default MeetupCard
