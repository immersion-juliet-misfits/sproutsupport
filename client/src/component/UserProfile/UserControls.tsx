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

      setWeatherData(data.currentConditions);
      setDailyForecastData(data.days);
      setAlertsData(data.alerts || []);
    })
    .catch((err) => {
      console.error('Error fetching weather data for city and state:', err);
    });
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

// ************************************

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

// ****************************************

// Export all functions in a single object
export default {
  fetchWeather,
  handleAvatarChange,
  handleUserNameChange,
  handleBioChange,
  handleLogOut,
};
