import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const Images = express.Router();
const prisma = new PrismaClient();
 Images.get('/image:', (req: Request, res: Response) => {
  const { id } = req.body
  prisma.image
    .findUnique({where: id})
    .then((image) => {
      image
        ? res.status(201).send(image)
        : res.status(404).send('Post not found');
    })
    .catch((err) => {
      console.error('Failed to get image: ', err);
      res.sendStatus(500);
    });
});
 Images.post('/image', (req: Request, res: Response) => {
  const { category, url } = req.body;
  prisma.image
    .create({
      data: {
        url,
        category,
      },
    })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error('Failed to create Post: ', err);
    });
});
 Images.patch('/image:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const { url } = req.body;
    prisma.image.update({
      where: {
        id: Number(id),
      },
      data: {
        url
      }
    })
      .then(updatedPost => {
        res.status(201).send(updatedPost);
      })
      .catch(() => res.sendStatus(404));
});
 Images.delete('/image:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const nId = parseInt(id);
    prisma.image.delete({
      where: {
        id: nId
      }
    })
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error('Failed to delete image: ', err)
        res.sendStatus(500)});
});

export default Images;
