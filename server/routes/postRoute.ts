import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const Posts = express.Router();
const prisma = new PrismaClient();

Posts.get('/post', (req: Request, res: Response) => {
  prisma.post
    .findMany()
    .then((posts) => {
      posts
        ? res.status(201).send(posts)
        : res.status(404).send('Post not found');
    })
    .catch((err) => {
      console.error('Failed to create post: ', err);
      res.sendStatus(500);
    });
});

Posts.post('/post', (req: Request, res: Response) => {
  const { userId, message } = req.body;
  prisma.post
    .create({
      data: {
        userId,
        message,
      },
    })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error('Failed to create Post: ', err);
    });
});

Posts.patch('/post:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const { message } = req.body;
  console.log('updtd: ', id)
  // if (updateType === 'message') {
    prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        message
      }
    })
      .then(updatedPost => {
        console.log('updated', updatedPost);
        res.status(201).send(updatedPost);
      })
      .catch(() => res.sendStatus(404));
  // }
});

Posts.delete('/post:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const nId = parseInt(id);
    prisma.post.delete({
      where: {
        id: nId
      }
    })
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error('Failed to delete post: ', err)
        res.sendStatus(500)});
});

export default Posts;
