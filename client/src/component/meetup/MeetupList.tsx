import MeetupListItem from './MeetupListItem'

const MeetupList = ({list}: {list: Array<T>}) =>{
  return(
    <>
    {list.map((group, i)=>{return(<MeetupListItem group={group} index={i}/>)})}
    </>
  )
} 

export default MeetupList