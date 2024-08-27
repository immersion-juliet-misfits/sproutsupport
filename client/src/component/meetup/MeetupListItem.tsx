import {Button, Card, CardHeader, CardBody, Image, Center, useToast} from '@chakra-ui/react';
import axios from 'axios';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

const MeetupListItem = ({group, remove, swap, createSwapUpdate, user, isJoined, refresh}: {group: object, remove: any, swap: any, createSwapUpdate: any, user: object, isJoined: boolean, refresh: any}) => {
const toast = useToast

const joinMeetup = (): void =>{
axios.post('meetup/AttendeeCreate',{userId: user.id, meet_id: group.id})
.then(()=>{
  refresh()
})
.catch((err)=>{
  toast({
    title: 'Can\'t join',
    description: "Error some thing went wrong",
    duration: 5000,
    isClosable: true,
    position: 'top'
  })
  console.error('cant\'t join: ', err)
})
}

const leaveMeetup = (): void =>{
  axios.get('/meetup/Attendee')
  .then((result)=>{
    let meetTest: number = 0
    const arr = result.data
for(let i = 0; i < arr.length; i++){
  if(arr[i].userId === user.id && arr[i].meet_id === group.id){
meetTest = arr[i].id
  } 
}
const url = `meetup/AttendeeLeave/${meetTest}`
axios.delete(url)
.then(()=>{
  refresh()
})
.catch((err)=>{
  toast({
    title: 'Can\'t leave',
    description: "Error some thing went wrong",
    duration: 5000,
    isClosable: true,
    status: "error",
    position: 'top'
  })
  console.error('cant\'t join: ', err)
})

})
.catch((err)=>{
  toast({
    title: 'Can\'t leave',
    description: "Error some thing went wrong",
    duration: 5000,
    isClosable: true,
    status: "error",
    position: 'top'
  })
  console.error('cant\'t find Attende for this meetUp: ', err)
})
  }

  return(<div>
    <Card>
    <CardBody bg={"green.100"}>
      <Image mx={"auto"} objectFit={'cover'} src={group.imageUrl} h={"140px"} w={"130px"}></Image>
      <CardHeader><Center><b>{group.eventName}</b></Center></CardHeader>
    
<b>{group.location}</b>
<div>{'starts at ' + group.time_date}</div>
<div>{group.description}</div>
{user.id === group.userId && <Center>
  <Button onClick={()=>{
  swap(group); 
  createSwapUpdate();
  }}><EditIcon/></Button>
<Button onClick={()=>{remove(group.id)}}><DeleteIcon/></Button>
</Center>}
<Center>
{group.userId !== user.id && <>{isJoined === false && <Button onClick={()=>{joinMeetup()}}>Join</Button>}</>}
{group.userId !== user.id && <>{isJoined === true && <Button onClick={()=>{leaveMeetup()}}>Leave</Button>}</>}
</Center>
</CardBody>
</Card>
</div>)
}

export default MeetupListItem