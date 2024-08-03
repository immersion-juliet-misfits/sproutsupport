import { CronJob } from 'cron';
// import express, { Request, Response } from 'express';
import { PrismaClient } from'@prisma/client';
import axios from 'axios';


const prisma = new PrismaClient();
const job = new CronJob('*/9 * * * * *', () => { // wanna make this dynamic 
  // console.log('rn', new Date());

  // overdue tasks || find them and update active to false(needs to be clicked to be true again/not overdue)
  prisma.task.updateMany({where: { nextComplection: { lt: new Date() }, overdue: false }, data: { overdue: true }}) // marks tasks as overdue
  // prisma.task.findMany({where: { nextComplection: { lt: new Date() }, overdue: false}})
   .then((data) => {

    // notify plant owner of their overdue task
    if (data.count > 0) {
      console.log(data, 'OVERDUE') // count can be useful for displaying number of overdue tasks
    }
   })
})

export default job;