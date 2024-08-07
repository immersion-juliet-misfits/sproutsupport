import express, {Request, Response } from 'express'
//import axios from 'axios'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const routerMeetup = express.Router()

routerMeetup.get('/all', (req: Request, res: Response): void =>{
  prisma.meet.findMany()
  .then((result)=>{
    res.status(200).send(result)
  })
  .catch((err)=>{
    console.error('Error meetup get line 13: ', err)
    res.sendStatus(500)
  })
})

routerMeetup.post('/create',(req: Request, res: Response): void =>{
 const {time_date, location, eventName, description, imageUrl, userId}: {time_date: string, location: string, eventName: string, description: string, imageUrl: string, userId: any} = req.body
  prisma.meet.create({
    data:{
      time_date,
      location,
      eventName,
      description,
      imageUrl,
      userId
    }
  })
  .then((result)=>{
    res.status(201).send(result)
  })
  .catch((err)=>{
    console.error('Error meetup get line 28: ', err)
    res.sendStatus(500)
  })
})

routerMeetup.patch('/update/:id',(req: Request, res: Response): void =>{
  const {time_date, location, eventName, description, imageUrl}: {time_date: string, location: string, eventName: string, description: string, imageUrl: string} = req.body
  const {id}: {id: string} = req.params
 const realId = parseInt(id)
  prisma.meet.update({
    where:{
      id: realId
    },
    data:{
      time_date,
      location,
      eventName,
      description,
      imageUrl,
    }
  })
  .then((result)=>{
    res.status(200).send(result)
  })
  .catch((err)=>{
    console.error('Error meetup update line 60: ', err)
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
  .then((result)=>{
    res.status(200).send(result)
  })
  .catch((err)=>{
    console.error('Error meetup update line 60: ', err)
    res.sendStatus(500)
  })
})

export default routerMeetup