import {Button, Card, CardHeader, CardBody, Image, Center, useToast, Box} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react'
import imagesExists from 'image-exists'

const MeetupListItem = ({group, user, showSwitch}: {group: object, user: object, isJoined: boolean, showSwitch: void}) => {
const [check, setCheck] = useState(false)

useEffect(()=>{
  imagesExists(group.imageUrl, (img: boolean)=>{
    if(img === true){
      setCheck(true)
    }
  })
},[])

  return(<div>
    <Card id="g-card">
    <CardBody >
    {check === true && <Image mx={"auto"} objectFit={'fill'} src={group.imageUrl} h={"150px"} w={"430px"}></Image>}
    {check === false && <Image mx={"auto"} objectFit={'fill'} src={'https://sproutsupportbucket.s3.us-east-2.amazonaws.com/sproutsSupportLogo1.jpg'} h={"150px"} w={"430px"}></Image>}
      <CardHeader bg={"#6EB257"}><Center><b>{group.eventName}</b></Center></CardHeader>
      <Box id="g-box" my={"10px"}>
<div>{'starts at ' + group.time_date}</div>
<div>{'time left ' + (group.timeleft !== undefined ? group.timeleft : 'calculating')}</div>
</Box>
{user.id === group.userId && <Center>
</Center>}

<Center><Button id='g-button' onClick={()=>{showSwitch(true, group)}}>moreInfo</Button></Center>
</CardBody>
</Card>
</div>)
}

export default MeetupListItem