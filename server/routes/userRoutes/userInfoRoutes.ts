import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const UserInfo = express.Router();

UserInfo.get('/getUserData', (req: Request, res: Response) => {
  const userId = 1; // Replace with the actual user ID from session or request

  prisma.user
    .findUnique({
      where: { id: userId },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      res.status(500).send('Failed to fetch user data');
    });
});


UserInfo.post('/updateBio', (req: Request, res: Response) => {
  const { userId, bio } = req.body;

  if (!userId || !bio) {
    return res.status(400).send('User ID and Bio are required');
  }

  prisma.user
    .update({
      where: { id: userId },
      data: { bio },
    })
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((error) => {
      console.error('Error updating bio:', error);
      res.status(500).send('Failed to update bio');
    });
});


UserInfo.post('/updateLocation', (req: Request, res: Response) => {
  const { userId, location_id } = req.body;

  if (!userId || !location_id) {
    return res.status(400).send('User ID and Location ID are required');
  }

  prisma.user
    .update({
      where: { id: userId },
      data: { location_id: parseInt(location_id, 10) },
    })
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((error) => {
      console.error('Error updating location:', error);
      res.status(500).send('Failed to update location');
    });
});

UserInfo.post('/updateUserName', (req: Request, res: Response) => {
  const { userId, userName } = req.body;

  if (!userId || !userName) {
    return res.status(400).send('User ID and User Name are required');
  }

  prisma.user
    .update({
      where: { id: userId },
      data: { userName },
    })
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((error) => {
      console.error('Error updating userName:', error);
      res.status(500).send('Failed to update userName');
    });
});

export default UserInfo;
