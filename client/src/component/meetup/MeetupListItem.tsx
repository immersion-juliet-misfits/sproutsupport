const MeetupListItem = ({group, index}: {group: object, index: number}) => {
  return(<div key={index}>
<div>{group.eventName}</div>
<div>{group.location}</div>
<div>{group.time_date}</div>
<div>{group.imageUrl}</div>
<div>{group.description}</div>
</div>)
}

export default MeetupListItem