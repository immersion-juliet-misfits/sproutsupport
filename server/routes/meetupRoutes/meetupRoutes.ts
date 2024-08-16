import express, {Request, Response } from 'express'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'

const { WEATHER_KEY } = process.env;
const prisma = new PrismaClient()
const routerMeetup = express.Router()

routerMeetup.get('/all/:id', (req: Request, res: Response): void =>{
  const {id} = req.params
 const realId = parseInt(id)
  prisma.meet.findMany()
  .then((result: any)=>{
    res.status(200).send(result)
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

  const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/64.7552,147.3534';
  const dailyForecastUrl = `${baseUrl}?key=${WEATHER_KEY}&unitGroup=us&include=days`;
axios.get(dailyForecastUrl)
    .then((result: any)=>{
      console.log(result)
      res.status(200).send(result)
    })
    .catch((err: any)=>{
      console.error('Error meetup get line 92: ', err)
      res.sendStatus(500)
    })
  })

export default routerMeetup