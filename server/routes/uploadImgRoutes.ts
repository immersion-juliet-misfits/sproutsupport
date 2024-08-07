import express, { Request, Response } from 'express';
import { uploadURL } from '../s3';
// import { PrismaClient } from'@prisma/client';

// const prisma = new PrismaClient();
const Upload = express.Router();

Upload.get('/url', (req: Request, res: Response) => {
  const { filename } = req.query;
  uploadURL(filename)
    .then((data) => {
      res.send(data) 
    })
    .catch((err) => {
        console.error('Could not get url', err)
    })
})

export default Upload;