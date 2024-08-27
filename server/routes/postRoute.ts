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
      console.error('Failed to get post: ', err);
      res.sendStatus(500);
    });
});

Posts.post('/post', (req: Request, res: Response) => {
  const { userId, message, imageUrl, username } = req.body;
  prisma.post
    .create({
      data: {
        userId,
        message,
        imageUrl,
        username,
      },
    })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error('Failed to create Post: ', err);
    });
});

Posts.patch('/post/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const { message } = req.body;
  prisma.post
    .update({
      where: {
        id: Number(id),
      },
      data: {
        message,
      },
    })
    .then((updatedPost) => {
      res.status(201).send(updatedPost);
    })
    .catch(() => res.sendStatus(404));
});

Posts.delete('/post/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const deleteComment = prisma.comment.deleteMany({
    where: {
      postId: Number(id)
    },
  });

  const deletePost = prisma.post.delete({
    where: {
      id: Number(id),
    },
  });

  prisma
    .$transaction([deleteComment, deletePost])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error('Failed to delete post: ', err);
      res.sendStatus(500);
    });
});

export default Posts;
