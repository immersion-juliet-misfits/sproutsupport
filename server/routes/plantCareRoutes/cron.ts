import { CronJob } from 'cron';
// import express, { Request, Response } from 'express';
import { PrismaClient } from'@prisma/client';
import axios from 'axios';


const prisma = new PrismaClient();
const job = new CronJob('*/9 * * * * *', () => {
  // console.log('rn', new Date());

  // overdue tasks || find them and update active to false(needs to be clicked to be true again/not overdue)
  // prisma.task.updateMany({where: { nextComplection: { lt: new Date() }, active: true}, data: {active: false}})
  prisma.task.findMany({where: { nextComplection: { lt: new Date() }, active: true}})
   .then((data) => {
    // console.log(data, 'OVERDUE') // count can be useful for displaying number of overdue tasks
   })
})

export default job;