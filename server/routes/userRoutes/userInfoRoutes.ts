import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import isAuthenticated from '../auth';

const prisma = new PrismaClient();
const UserInfo = express.Router();

UserInfo.get(
  '/getUserData',
  // isAuthenticated,
  (req: Request, res: Response) => {
    const userId = req.user?.id;
    // const { userId } = req.body;
    console.log('UserInfoRoutes User Obj: ', req.user);
    console.log('UserInfoRoutes User Body: ', req.body);

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
  }
);

UserInfo.patch(
  '/updateBio',
  // isAuthenticated,
  (req: Request, res: Response) => {
    const { userId, bio } = req.body;
    console.log('UserInfoRoutes User Obj: ', req.user);

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
  }
);

UserInfo.patch(
  '/updateLocation',
  // isAuthenticated,
  (req: Request, res: Response) => {
    const { userId, location_id } = req.body;
    // console.log('UserInfoRoutes User Obj: ', req.user);

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
  }
);

UserInfo.patch(
  '/updateUserName',
  // isAuthenticated,
  (req: Request, res: Response) => {
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
  }
);

export default UserInfo;
