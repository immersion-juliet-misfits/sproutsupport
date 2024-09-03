import express, {Request, Response } from 'express'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)

const { WEATHER_KEY } = process.env;
const prisma = new PrismaClient()
const routerMeetup = express.Router()


routerMeetup.get('/all/:id', (req: Request, res: Response): void =>{
  const {id} = req.params
 const realId = parseInt(id)
  prisma.meet.findMany()
  .then((result: any)=>{
const yours: Array<T> = []
const join: Array<T> = []
const pub: Array<T> = []
let combined: Array<T> = [] 

for(let i = 0; i < result.length; i++){
  if(result[i].userId === realId){
    yours.push(result[i])
  }
}
    prisma.Attendee.findMany()
    .then((list: any)=>{
      const edit: Array<T> = list.map((obj: object)=>{
        if(obj.userId === realId){
        return obj.meet_id
        }
      })
    for(let i = 0; i < result.length; i++){
      if(edit.includes(result[i].id)){
join.push(result[i])
      }else{
        if(result[i].userId !== realId){
        pub.push(result[i])
        }
      }
    }  
    combined = yours.concat(join)
//console.log({yours, join, pub, combined})
const dateSort = (a: any, b: any): void =>{
  if(dayjs(a.time_date).isSameOrBefore(b.time_date)){
  return -1
  }else{
  return 1
  }
}
yours.sort(dateSort)
join.sort(dateSort)
pub.sort(dateSort)
combined.sort(dateSort)

res.status(200).send({yours, join, pub, combined})
    })
    .catch((err: any)=>{
      console.error('Error meetup get line 92: ', err)
      res.sendStatus(500)
    })

    //res.status(200).send(result)
  })
  .catch((err: any)=>{
    console.error('Error meetup get line 15: ', err)
    res.sendStatus(500)
  })
})

routerMeetup.post('/create',(req: Request, res: Response): void =>{
 const {time_date, location, eventName, description, imageUrl, userId, status}: {time_date: string, location: string, eventName: string, description: string, imageUrl: string, userId: number, status: string} = req.body
  prisma.meet.create({
    data:{
      time_date,
      location,
      eventName,
      description,
      imageUrl,
      userId,
      status
    }
  })
  .then((result: any)=>{
    res.status(201).send(result)
  })
  .catch((err: any)=>{
    console.error('Error meetup get line 37: ', err)
    res.sendStatus(500)
  })
})

routerMeetup.patch('/update/:id',(req: Request, res: Response): void =>{
  //const {time_date, location, eventName, description, imageUrl, status, message}: {time_date: string, location: string, eventName: string, description: string, imageUrl: string, status: string, message: string} = req.body
  const {id}: {id: string} = req.params
 const realId = parseInt(id)
const data: object = {}
for(const key in req.body){
  if(req.body[key] !== undefined){
    data[key] = req.body[key]
  }
}

  prisma.meet.update({
    where:{
      id: realId
    },
    data
  })
  .then((result: any)=>{
    res.status(200).send(result)
  })
  .catch((err: any)=>{
    console.error('Error meetup update line 64: ', err)
    res.sendStatus(500)
  })
})

routerMeetup.delete('/delete/:id',(req: Request, res: Response): void =>{
  const {id}: {id: string} = req.params
 const realId = parseInt(id)
  prisma.meet.delete({
    where:{
      id: realId
    }
  })
  .then((result: any)=>{
    res.status(200).send(result)
  })
  .catch((err: any)=>{
    console.error('Error meetup update line 81: ', err)
    res.sendStatus(500)
  })
})

routerMeetup.get('/Attendee', (req: Request, res: Response): void =>{
prisma.Attendee.findMany()
  .then((result: any)=>{
    res.status(200).send(result)
  })
  .catch((err: any)=>{
    console.error('Error meetup get line 92: ', err)
    res.sendStatus(500)
  })
})

routerMeetup.post('/AttendeeCreate',(req: Request, res: Response): void =>{
 const {userId, meet_id}: {userId: number, meet_id} = req.body
  prisma.Attendee.create({
    data:{
      userId,
      meet_id
    }
  })
  .then((result: any)=>{
    res.status(201).send(result)
  })
  .catch((err: any)=>{
    console.error('Error meetup get line 109: ', err)
    res.sendStatus(500)
  })
})

routerMeetup.delete('/AttendeeLeave/:id',(req: Request, res: Response): void =>{
  const {id}: {id: string} = req.params
  const realId = parseInt(id)
   prisma.Attendee.delete({
    where:{
      id: realId
    }})
   .then((result: any)=>{
     res.status(200).send(result)
   })
   .catch((err: any)=>{
     console.error('Error meetup get line 124: ', err)
     res.sendStatus(500)
   })
 })

 routerMeetup.get('/weather', (req: Request, res: Response): void =>{
  const { city, state } = req.query;

  const location = `${city},${state}`;
  const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${WEATHER_KEY}`;

axios.get(weatherUrl)
    .then((result: any)=>{
      res.status(200).json(result.data)
    })
    .catch((err: any)=>{
      console.error('Error meetup get line 92: ', err)
      res.sendStatus(500)
    })
  })

export default routerMeetup