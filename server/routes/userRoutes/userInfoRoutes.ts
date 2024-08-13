import express, { Request, Response } from 'express';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();
const UserInfo = express.Router();
const { WEATHER_KEY } = process.env;
// console.log('Key Check: ', WEATHER_KEY);

UserInfo.get('/getUserData', (req: Request, res: Response) => {
  const userId = req.user?.id;
  console.log('Req User Info: ', req.user);

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

// GeoLocation API
UserInfo.patch('/updateLatLon', (req: Request, res: Response) => {
  const { latitude, longitude } = req.body;
  const userId = req.user.id;

  if (!userId || latitude === undefined || longitude === undefined) {
    return res
      .status(400)
      .send('User ID, Latitude, and Longitude are required');
  }

  prisma.user
    .update({
      where: { id: userId },
      data: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    })
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((error) => {
      console.error('Location Update: Failed ', error);
      res.status(500).send('Location Update: Failed ');
    });
});

// Weather API Route
UserInfo.get('/weatherData', (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    console.log('User not authenticated or session not found');
    return res.status(400).send('User not authenticated');
  }

  if (!user.latitude || !user.longitude) {
    console.log('User location data missing:', {
      latitude: user.latitude,
      longitude: user.longitude,
    });
    return res.status(400).send('User latitude and longitude are required');
  }

  const baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${user.latitude},${user.longitude}`;
  const currentWeatherUrl = `${baseUrl}/today?key=${WEATHER_KEY}`;
  const dailyForecastUrl = `${baseUrl}?key=${WEATHER_KEY}&unitGroup=us&include=days`;
  const alertsUrl = `${baseUrl}?key=${WEATHER_KEY}&include=alerts`;

  // console.log('Current Weather API URL:', currentWeatherUrl);
  // console.log('Daily Forecast API URL:', dailyForecastUrl);
  // console.log('Weather Alerts API URL:', alertsUrl);

  axios
    .all([
      axios.get(currentWeatherUrl),
      axios.get(dailyForecastUrl),
      axios.get(alertsUrl),
    ])
    .then(
      axios.spread(
        (currentWeatherResponse, dailyForecastResponse, alertsResponse) => {
          // console.log('Current Weather Data:', currentWeatherResponse.data);
          // console.log('Daily Forecast Data:', dailyForecastResponse.data.days);
          // console.log('Weather Alerts Data:', alertsResponse.data.alerts);

          res.json({
            currentWeather: currentWeatherResponse.data,
            dailyForecast: dailyForecastResponse.data.days,
            weatherAlerts: alertsResponse.data.alerts || [],
          });
        }
      )
    )
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      res.status(500).send('Failed to fetch weather data');
    });
});

export default UserInfo;
