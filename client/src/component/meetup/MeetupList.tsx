import MeetupListItem from './MeetupListItem'

const MeetupList = ({list}) =>{
  return(
    <>
    {list.map((group)=>{return(<MeetupListItem group={group}/>)})}
    </>
  )
} 

export MeetupList