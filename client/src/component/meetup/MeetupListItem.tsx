import {Button, Card, CardHeader, CardBody} from '@chakra-ui/react';

const MeetupListItem = ({group, remove, swap, createSwapUpdate, user}: {group: object, remove: any, swap: any, createSwapUpdate: any, user: object}) => {
  return(<div>
    <Card>
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
  }}>update</Button>
<Button onClick={()=>{remove(group.id)}}>delete</Button>
</>}
</CardBody>
</Card>
</div>)
}

export default MeetupListItem