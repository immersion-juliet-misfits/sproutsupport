import axios from 'axios';

// *******************************************

const fetchWeather = (
  city,
  state,
  setWeatherData,
  setDailyForecastData,
  setAlertsData
) => {
  if (!city || !state) {
    console.error('City or State is undefined.');
    return;
  }

  axios
    .get(`/user/weatherDataByCity?city=${city}&state=${state}`)
    .then((response) => {
      const data = response.data;

      // Update the calling component's states using the setters
      setWeatherData(data.currentConditions);
      setDailyForecastData(data.days);
      setAlertsData(data.alerts || []);
    })
    .catch((err) => {
      console.error('Error fetching weather data for city and state:', err);
    });
};

// ********

// ** This needs to be replaced by the passed in Version
// const fetchWeather = (city, state) => {
//   if (!city || !state) {
//     console.error('City or State is undefined.');
//     return;
//   }

//   axios
//     .get(`/user/weatherDataByCity?city=${city}&state=${state}`)
//     .then((response) => {
//       // console.log('Retrieved weather data:', response.data);
//       const data = response.data;

//       setWeatherData(data.currentConditions);
//       setDailyForecastData(data.days);
//       setAlertsData(data.alerts || []);
//       // setApiError(false);
//     })
//     .catch((err) => {
//       // setApiError(true);
//       // console.error('Error fetching weather data for city and state:', err);
//     });
// };

// ********

const setLocation = (newLocation) => {
  location = { ...location, ...newLocation };
};

// *******************************************

const handleAvatarChange = (event, setUser, BUCKET_NAME) => {
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

// *******************************************

const handleUserNameChange = (newUserName, setUser) => {
  axios
    .patch('/user/updateUserName', { userName: newUserName })
    .then((response) => {
      return setUser(response.data);
    })
    .catch((error) => {
      console.error('Update User Name: Failed ', error);
    });
};

// ************************************

const handleLocationChange = (user, fetchWeather) => {
  // const { user } = useUser();
  // fetchWeather(user.city, user.state, setWeatherData, setDailyForecastData, setAlertsData);
  fetchWeather(user.city, user.state);
  setLocation({ city: '', state: '' });
};

// ************************************

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setLocation((prevLocation) => ({
    ...prevLocation,
    [name]: value,
  }));
};

// *******

const handleBioChange = (newBio, setUser) => {
  axios
    .patch('/user/updateBio', { bio: newBio })
    .then((response) => {
      return setUser(response.data);
    })
    .catch((error) => {
      console.error('Update Bio: Failed ', error);
    });
};

// *******

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

// *******

// const handleLogOut = () => {
//   fetch('/api/logout', {
//     method: 'POST',
//     credentials: 'include',
//   })
//     .then((response) => {
//       if (response.ok) {
//         onLogout();
//         navigate('/login');
//       } else {
//         console.error('Logout: Failed');
//       }
//     })
//     .catch((err) => {
//       console.error('Logout: Failed', err);
//     });
// };

// ****************************************

// Export all functions in a single object
export default {
  fetchWeather,
  handleAvatarChange,
  handleUserNameChange,
  handleLocationChange,
  handleInputChange,
  handleBioChange,
  handleLogOut,
};
