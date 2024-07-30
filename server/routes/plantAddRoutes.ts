import express, { Request, Response } from 'express';
// import { PrismaClient } from'@prisma/client';

// const prisma = new PrismaClient();
const Plants = express.Router();

Plants.get('/test', (req: Request, res: Response) => {
  res.send('test success')
})

export default Plants;
