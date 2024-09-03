import express, { Request, Response } from 'express';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import Posts from '../postRoute';

const prisma = new PrismaClient();
const UserInfo = express.Router();
const { WEATHER_KEY } = process.env;
// console.log('Key Check: ', WEATHER_KEY);

UserInfo.get('/getUserData', (req: Request, res: Response) => {
  const userId = req.user?.id;
  // console.log('Req User Info: ', req.user);

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
      // console.log('UIR User Check: ', user);
      res.send(user);
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      res.status(500).send('Failed to fetch user data');
    });
});

// ******
// Fetch a specific Users posts

Posts.get('/post/:userId', (req: Request, res: Response) => {
  // const { userId } = req.params;
  // console.log('U-Id Check: ', req.params);
  const userId = parseInt(req.params.userId, 10);
  console.log('New U-Id Check: ', userId, typeof userId);

  prisma.post
    .findMany({
      where: {
        userId: userId,
      },
    })
    .then((posts) => {
      posts.length > 0
        ? res.status(200).send(posts)
        : res.status(404).send('No posts found for this user');
    })
    .catch((err) => {
      console.error('Failed to get posts: ', err);
      res.sendStatus(500);
    });
});

// ******

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

// ****

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

// ****

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

// ****

UserInfo.patch('/updateLocation', (req: Request, res: Response) => {
  console.log('Request Handler: Hello World');

  const { city, state } = req.body;
  const userId = req.user?.id;

  console.log('Received city:', city, 'state:', state);
  console.log('Received userId:', userId);

  if (!userId || !city || !state) {
    return res.status(400).send('User ID, City, and State are required');
  }

  req.user.city = city;
  req.user.state = state;

  prisma.user
    .update({
      where: { id: userId },
      data: {
        city: city || null,
        state: state || null
      },
    })
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((error) => {
      console.error('Error updating location:', error);
      res.status(500).send('Failed to update location');
    });
});

// **************

// * Call to Weather API ****
// Fetch Weather by entering City & State
UserInfo.get('/weatherDataByCity', (req: Request, res: Response) => {
  const { city, state } = req.query;
  const userId = req.user?.id;

  if (!city || !state) {
    return res.status(400).send('City and State are required');
  }

  const location = `${city},${state}`;
  const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${WEATHER_KEY}`;

  axios
    .get(weatherUrl)
    .then((response) => {
      // console.log('Weather data retrieved successfully:', response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      res.status(500).send('Failed to fetch weather data');
    });
});

// **************

// *** Update all Privacy Toggles ***
UserInfo.patch('/updateUserField', (req: Request, res: Response) => {
  const { field, value } = req.body;
  const userId = req.user.id;

  console.log('Req User Check: ', req.user, 'Id Type Check: ', req.user.id);

  const validFields = [
    'showWeather',
    'showPlants',
    'showMyMeetups',
    'showOtherMeetups',
    'showForumPosts',
  ];
  if (!userId || !validFields.includes(field) || typeof value !== 'boolean') {
    return res
      .status(400)
      .send('User ID, a valid field, and a boolean value are required');
  }

  // req.user[field] = value;
  // Attempt to resolve Typescript warning
  (req.user[field as keyof typeof req.user] as boolean) = value;

  prisma.user
    .update({
      where: { id: userId },
      data: { [field]: value },
    })
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((error) => {
      console.error(`Error updating ${field}:`, error);
      res.status(500).send(`Failed to update ${field}`);
    });
});

// *******

// Retrieve another Users profile Data to view it
UserInfo.get('/public/:userId', (req, res) => {
  const { userId } = req.params;

  prisma.user.findUnique({
    where: { id: Number(userId) },
    select: {
      userName: true,
      avatar: true,
      bio: true,
      city: true,
      state: true,
    },
  })
  .then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  })
  .catch(err => {
    res.status(500).send('Internal Server Error');
  });
});


export default UserInfo;
