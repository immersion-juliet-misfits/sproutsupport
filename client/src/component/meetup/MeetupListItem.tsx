import {Button } from '@chakra-ui/react';

const MeetupListItem = ({group, index, update, remove}: {group: object, index: number, update: any, remove: any}) => {
  return(<div key={index}>
    <Button onClick={()=>{update({time_date: 'update', location: 'update', eventName: 'update', description: 'update', imageUrl: 'update', id: 12})}}>update</Button>
    <Button onClick={()=>{remove(12)}}>delete</Button>
<div>{group.eventName}</div>
<div>{group.location}</div>
<div>{group.time_date}</div>
<div>{group.imageUrl}</div>
<div>{group.description}</div>
</div>)
}

export default MeetupListItem