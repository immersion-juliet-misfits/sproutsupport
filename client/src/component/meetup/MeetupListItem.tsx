import {Button, Card, CardHeader, CardBody } from '@chakra-ui/react';
import axios from 'axios';

const MeetupListItem = ({group, remove, swap, createSwapUpdate, user, isJoined, refresh}: {group: object, remove: any, swap: any, createSwapUpdate: any, user: object, isJoined: boolean, refresh: any}) => {

const joinMeetup = (): void =>{
axios.post('meetup/AttendeeCreate',{userId: user.id, meet_id: group.id})
.then(()=>{
  refresh()
})
.catch((err)=>{
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
  console.error('cant\'t join: ', err)
})

})
.catch((err)=>{
  console.error('cant\'t find Attende for this meetUp: ', err)
})
  }

  return(<div>
    <Card>
      <img src={group.imageUrl}></img>
      <CardHeader><div>{group.eventName}</div></CardHeader>
      <CardBody>
<div>{group.location}</div>
<div>{group.time_date}</div>
<div>{group.imageUrl}</div>
<div>{group.description}</div>
{user.id === group.userId && <>
  <Button onClick={()=>{
  swap(group); 
  createSwapUpdate();
  }}>Update</Button>
<Button onClick={()=>{remove(group.id)}}>Delete</Button>
</>}
{group.userId !== user.id && <>{isJoined === false && <Button onClick={()=>{joinMeetup()}}>Join</Button>}</>}
{group.userId !== user.id && <>{isJoined === true && <Button onClick={()=>{leaveMeetup()}}>Leave</Button>}</>}
</CardBody>
</Card>
</div>)
}

export default MeetupListItem