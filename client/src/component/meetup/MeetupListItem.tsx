import {Button, Card, CardHeader, CardBody} from '@chakra-ui/react';

const MeetupListItem = ({group, index, remove, swap}: {group: object, index: number, remove: any, swap: any}) => {
  return(<div key={index}>
    <Card>
      <CardHeader><div>{group.eventName}</div></CardHeader>
      <CardBody>
<div>{group.location}</div>
<div>{group.time_date}</div>
<div>{group.imageUrl}</div>
<div>{group.description}</div>
<Button onClick={()=>{swap(group)}}>update</Button>
<Button onClick={()=>{remove(12)}}>delete</Button>
</CardBody>
</Card>
</div>)
}

export default MeetupListItem