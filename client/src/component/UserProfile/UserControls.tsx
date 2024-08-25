import axios from 'axios';

let weatherData = null;
let dailyForecastData = null;
let alertsData = null;
let location = {};

const setLocation = (newLocation) => {
  location = { ...location, ...newLocation };
};

// *******************************************

// const fetchWeather = (city, state, setWeatherData, setDailyForecastData, setAlertsData) => {
//   axios
//     .get(`/user/weatherDataByCity?city=${city}&state=${state}`)
//     .then((response) => {
//       const data = response.data;
//       setWeatherData(data.currentConditions);
//       setDailyForecastData(data.days);
//       setAlertsData(data.alerts || []);
//     })
//     .catch((error) => {
//       console.error('Error fetching weather data for city and state:', error);
//     });
// };

// ********

  //  This needs to be replaced by the passed in Version
  const fetchWeather = (city, state) => {
    axios
      .get(`/user/weatherDataByCity?city=${city}&state=${state}`)
      .then((response) => {
        // console.log('Retrieved weather data:', response.data);
        const data = response.data;

        setWeatherData(data.currentConditions);
        setDailyForecastData(data.days);
        setAlertsData(data.alerts || []);
        setApiError(false);
      })
      .catch((err) => {
        setApiError(true);
        // console.error('Error fetching weather data for city and state:', err);
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

const handleLocationChange = (fetchWeather) => {
  fetchWeather(location.city, location.state);
  setLocation({ city: '', state: '' });
};

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setLocation((prevLocation) => ({
    ...prevLocation,
    [name]: value,
  }));
};

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

// const useWeatherEffect = (user, fetchWeather) => {
//   useEffect(() => {
//     if (user?.city && user?.state) {
//       fetchWeather(user.city, user.state);
//     }
//   }, [user.city, user.state]);
// };

// Export all functions in a single object
const controls = {
  setLocation,
  fetchWeather,
  handleAvatarChange,
  handleUserNameChange,
  handleLocationChange,
  handleInputChange,
  handleBioChange,
  handleLogOut,
};

export default controls;
