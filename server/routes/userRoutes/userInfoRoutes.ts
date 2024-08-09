import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const UserInfo = express.Router();

UserInfo.get('/getUserData', (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  prisma.user
    .findUnique({
      where: { id: userId },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      console.log('UIR User Check: ', user);
      res.send(user);
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      res.status(500).send('Failed to fetch user data');
    });
});

UserInfo.patch('/updateBio', (req: Request, res: Response) => {
  const { bio } = req.body;
  const userId = req.user.id;

  if (!userId || !bio) {
    return res.status(400).send('User ID and Bio are required');
  }

  req.user.bio = bio;

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

UserInfo.patch('/updateLocation', (req: Request, res: Response) => {
  const { location_id } = req.body;
  const userId = req.user.id;

  if (!userId || !location_id) {
    return res.status(400).send('User ID and Location ID are required');
  }

  req.user.location_id = location_id;

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

UserInfo.patch('/updateUserName', (req: Request, res: Response) => {
  const { userName } = req.body;
  const userId = req.user.id;

  if (!userId || !userName) {
    return res.status(400).send('User ID and User Name are required');
  }

  req.user.userName = userName;

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

UserInfo.patch('/updateAvatar', (req: Request, res: Response) => {
  const { avatar } = req.body;
  const userId = req.user.id;

  if (!userId || !avatar) {
    return res.status(400).send('User ID and Avatar URL are required');
  }

  req.user.avatar = avatar;

  prisma.user
    .update({
      where: { id: userId },
      data: { avatar },
    })
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((error) => {
      console.error('Update Avatar: Failed ', error);
      res.status(500).send('Update Avatar: Failed ');
    });
});

export default UserInfo;
