import { CronJob } from 'cron';
// import express, { Request, Response } from 'express';
// import { PrismaClient } from'@prisma/client';
// import axios from 'axios';


// const prisma = new PrismaClient();
const sendEmail = new CronJob('*/1 * * * *', () => { // wanna make this dynamic 
console.log('hey test')
})

 export default sendEmail;