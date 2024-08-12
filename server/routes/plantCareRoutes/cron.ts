import { CronJob } from 'cron';
// import express, { Request, Response } from 'express';
import { PrismaClient } from'@prisma/client';
import axios from 'axios';
import { io } from '../../index'


const prisma = new PrismaClient();
// const io = new Server(httpServer);

const job = new CronJob('*/9 * * * * *', () => { // wanna make this dynamic 
  // console.log('rn', new Date());

  // overdue tasks || find them and update active to false(needs to be clicked to be true again/not overdue)
  // returns object with count
  // prisma.task.updateMany({where: { nextComplection: { lt: new Date() }, overdue: false }, data: { overdue: true }}) // marks tasks as overdue
  prisma.task.findMany({where: { nextComplection: { lt: new Date() }, overdue: false}, include: {taskPlant: true}}) // gives me all entries back
   .then((data) => {
     data.forEach((task) => {
      io.emit('overdue', task)
     })
    // notify plant owner of their overdue task
    if (data.length > 0) {
      // console.log(data, 'OVERDUE') // count can be useful for displaying number of overdue tasks
      prisma.task.updateMany({where: { nextComplection: { lt: new Date() }, overdue: false }, data: {overdue: true}})
        .then(() => {
          // console.log('updated')
        })
    }
   })
})

export default job;