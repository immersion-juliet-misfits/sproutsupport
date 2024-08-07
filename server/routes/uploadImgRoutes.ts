import express, { Request, Response } from 'express';
import { uploadURL } from '../s3';
import { PrismaClient } from'@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const Upload = express.Router();

Upload.get('/url', (req: Request, res: Response) => {
  const { filename } = req.query;
  uploadURL(filename)
    .then((data) => {
      console.log('from upload url route express', data)
      res.send(data) 
    })
    .catch((err) => {
        console.error('express route fauled', err)
    })
})

export default Upload;