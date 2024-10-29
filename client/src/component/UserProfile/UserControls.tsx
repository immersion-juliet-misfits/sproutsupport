import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Global User states WIP ****************************************

interface User {
  id: number;
  google_id: string;
  userName: string;
  email: string;
  avatar: string;
  bio: string;
  city: string;
  state: string;
}

interface Location {
  city: string;
  state: string;
}

interface WeatherData {
  temp: number;
  conditions: string;
  windspeed: number;
  humidity: number;
  feelslike: number;
  uvindex: number;
  visibility: number;
}

interface DailyForecast {
  datetime: string;
  tempmax: number;
  tempmin: number;
  conditions: string;
}

interface AlertData {
  event: string;
  headline: string;
  description: string;
  ends: string;
}

const getPublicUserData = (
  username: string,
  setPublicUser: (user: object) => void
) => {
  axios
    .get(`/user/public/${username}`)
    .then(({ data }) => {
      setPublicUser(data);
    })
    .catch((err) => {
      console.error('Fetch Other User Profile Data: Failed ', err);
    });
};

const checkUserExists = (username, setUserExists) => {
  axios
    .get(`/user/public/${username}`)
    .then(({ data }) => {
      if (data) {
        setUserExists(true);
      } else {
        setUserExists(false);
      }
    })
    .catch(() => {
      setUserExists(false);
    });
};

const goToUserProfile = (
  username: string,
  setUserExists: (exists: boolean) => void
) => {
  axios
    .get(`/user/public/${username}`)
    .then(({ data }) => {
      if (data) {
        setUserExists(true);
        window.location.href = `/public-profile/${username}`;
      } else {
        setUserExists(false);
      }
    })
    .catch(() => {
      setUserExists(false);
    });
};

const fetchWeather = (
  city: string,
  state: string,
  setWeatherData: (data: WeatherData) => void,
  setDailyForecastData: (data: DailyForecast[]) => void,
  setAlertsData: (data: AlertData[]) => void,
  handleLocationChange: (
    city: string | null,
    state: string | null,
    setUser: (user: object) => void
  ) => void,
  setUser: (user: object) => void
) => {
  if (!city || !state) {
    console.error('City or State is undefined.');
    return;
  }

  axios
    .get(`/user/weatherDataByCity?city=${city}&state=${state}`)
    .then((response) => {
      const data = response.data;
      console.log('Response Check: ', data);

      if (data && data.currentConditions) {
        // Valid location, update the weather data
        setWeatherData(data.currentConditions);
        setDailyForecastData(data.days);
        setAlertsData(data.alerts || []);
      } else {
        // Invalid location, reset city and state in the database
        alert('Invalid Location');
        handleLocationChange('undefined', 'undefined', setUser);
      }
    })
    .catch((err) => {
      console.error('Error fetching weather data for city and state:', err);
      // Reset city and state to 'undefined' in the database upon API failure
      handleLocationChange('undefined', 'undefined', setUser);
    });
};

// ************

const getPlants = (user: object, setPlants: (plants: object[]) => void) => {
  axios
    .get(`/plants/all/${user.id}`)
    .then(({ data }) => {
      // console.log('Plant Data: ', data);
      setPlants(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getPosts = (setPosts: (posts: object[]) => void, userId: number) => {
  axios
    .get(`/post/post/${userId}`)
    .then(({ data }) => {
      //       // console.log('1 User Forum Data Check: ', data);
      if (data.length === 0) {
        console.log('User has no Posts.');
        setPosts([]); // Set as empty array to prevent browser error
      } else {
        setPosts(data);
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        console.log('No posts found for this user');
        // Set an empty array if no posts are found
        setPosts([]);
      } else {
        console.error('Failed to GET posts: ', err);
      }
    });
};

const getMeetups = (
  user: object,
  setMyMeetups: (myMeetups: object[]) => void
) => {
  axios
    .get(`/meetup/all/${user.id}`)
    .then(({ data }) => {
      // console.log('Meetups data:', data);
      setMyMeetups(data.yours);
    })
    .catch((err) => {
      console.error('Error fetching meetups:', err);
    });
};

const handleAvatarChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setUser: (user: object[]) => void,
  BUCKET_NAME: string
) => {
  const file = event.target.files[0];
  if (file) {
    axios
      .get('/upload/url', { params: { filename: file.name } })
      .then(({ data }) => {
        return axios.put(data, file, {
          headers: { 'Content-Type': file.type },
        });
      })
      .then(() => {
        const newAvatarUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${file.name}`;
        return axios
          .patch('/user/updateAvatar', { avatar: newAvatarUrl })
          .then((response) => {
            return setUser(response.data);
          });
      })
      .catch((err) => {
        console.error('Failed to get image url', err);
      });
  }
};

const handleUserNameChange = (
  newUserName: object,
  setUser: (user: object[]) => void
) => {
  axios
    .patch('/user/updateUserName', { userName: newUserName })
    .then((response) => {
      return setUser(response.data);
    })
    .catch((error) => {
      console.error('Update User Name: Failed ', error);
    });
};

const handleBioChange = (newBio, setUser: (user: object[]) => void) => {
  axios
    .patch('/user/updateBio', { bio: newBio })
    .then((response) => {
      return setUser(response.data);
    })
    .catch((error) => {
      console.error('Update Bio: Failed ', error);
    });
};

// ************

const handleLocationChange = (
  newCity,
  newState,
  setUser: (user: object[]) => void
) => {
  // console.log('Request: Hello World');
  // console.log('Location UpdateCheck: ', newCity, newState);
  axios
    .patch('/user/updateLocation', { city: newCity, state: newState })
    .then((response) => {
      // console.log('Response Check: ', response);
      return setUser(response.data);
    })
    .catch((error) => {
      console.error('Update Location: Failed ', error);
    });
};

// ************

const handleToggle = (field, value, setSettings) => {
  setSettings((prevState) => ({
    ...prevState,
    [field]: value,
  }));

  axios
    .patch('/user/updateUserField', { field, value })
    .then((status) => {
      // console.log('Update Field: Success ', status);
    })
    .catch((err) => {
      console.error('Error updating: ', err);
    });
};

const handleLogOut = (onLogout, navigate) => {
  fetch('/api/logout', {
    method: 'POST',
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        onLogout();
        navigate('/login');
      } else {
        console.error('Logout: Failed');
      }
    })
    .catch((err) => {
      console.error('Logout: Failed', err);
    });
};

const deleteAccount = (setUser: (user: object | null) => void) => {
  return axios
    .delete('/user/deleteAccount')
    .then(() => {
      alert('Account deleted successfully');
      setUser(null);
    })
    .catch((err) => {
      console.error('Failed to delete account:', err);
    });
};

export default {
  checkUserExists,
  deleteAccount,
  fetchWeather,
  getPublicUserData,
  getPlants,
  getPosts,
  getMeetups,
  goToUserProfile,
  handleAvatarChange,
  handleUserNameChange,
  handleBioChange,
  handleLocationChange,
  handleLogOut,
  handleToggle,
};
