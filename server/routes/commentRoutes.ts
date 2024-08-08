import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const Comments = express.Router();
const prisma = new PrismaClient();

Comments.get('/comment', (req: Request, res: Response) => {
  const { postId } = req.body
  prisma.comment
    .findMany({where: postId})
    .then((comments) => {
      comments
        ? res.status(201).send(comments)
        : res.status(404).send('Comment not found');
    })
    .catch((err) => {
      console.error('Failed to get comment: ', err);
      res.sendStatus(500);
    });
});

Comments.post('/comment', (req: Request, res: Response) => {
  const { postId, message } = req.body;
  prisma.comment
    .create({
      data: {
        postId,
        message,

      },
    })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error('Failed to create Comment: ', err);
    });
});

Comments.patch('/comment:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const { message } = req.body;
    prisma.comment.update({
      where: {
        id: Number(id),
      },
      data: {
        message
      }
    })
      .then(updatedComment => {
        res.status(201).send(updatedComment);
      })
      .catch(() => res.sendStatus(404));
});

Comments.delete('/comment:id', (req: Request, res: Response) => {
  const { id } = req.params;

    prisma.comment.delete({
      where: {
        id: parseInt(id)
      }
    })
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error('Failed to delete comment: ', err)
        res.sendStatus(500)});
});

export default Comments;