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
  const post = {
    userId: 0,
    image_id: 1,
    message: 'Hello',
  };
  prisma.post
    .create({
      data: post,
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('Failed to create Post: ', err);
    });
});

Posts.patch('/post:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const { updateType, updateVal } = req.body;
  if (updateType === 'message') {
    prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        message: updateVal
      }
    })
      .then(updatedPost => {
        console.log(updatedPost);
        res.status(201).send(updatedPost);
      })
      .catch(() => res.sendStatus(404));
  }
});

Posts.delete('/post:id', (req: Request, res: Response) => {
  const { id } = req.params;

    prisma.user.delete({
      where: {
        id: Number(id)
      }
    })
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error('Faild to delete post: ', err)
        res.sendStatus(500)});
});

export default Posts;
