import axios from 'axios';
import { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserTabs from './UserTabs';
import UserInfo from './UserInfo';
import UserPrivacy from './UserPrivacy';
import TopBar from './TopBar';

// User context
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

const CACHE_TIME = 1800000;

// Main component
const UserPrivateProfile = ({
  user,
  setUser,
  onLogout,
  BUCKET_NAME,
  fetchUserData,
}) => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('info');
  const [weatherData, setWeatherData] = useState(null);
  const [dailyForecastData, setDailyForecastData] = useState(null);
  const [alertsData, setAlertsData] = useState(null);
  const [location, setLocation] = useState({
    city: user.city || '',
    state: user.state || '',
  });
  const cachedWeatherData = JSON.parse(localStorage.getItem('weatherData'));
  const cachedLocation = JSON.parse(localStorage.getItem('cachedLocation'));
  const lastFetched = localStorage.getItem('lastFetched');

  const fetchWeather = (city, state) => {
    const currentTime = new Date().getTime();
    const cachedWeatherData = JSON.parse(localStorage.getItem('weatherData'));
    const cachedLocation = JSON.parse(localStorage.getItem('cachedLocation'));
    const lastFetched = localStorage.getItem('lastFetched');

    if (
      cachedWeatherData &&
      cachedLocation &&
      cachedLocation.city === city &&
      cachedLocation.state === state &&
      lastFetched &&
      currentTime - lastFetched < CACHE_TIME
    ) {
      // console.log('Using cached weather data from localStorage');
      setWeatherData(cachedWeatherData.currentConditions);
      setDailyForecastData(cachedWeatherData.days);
      setAlertsData(cachedWeatherData.alerts || []);
      return;
    }

    axios
      .get(`/user/weatherDataByCity?city=${city}&state=${state}`)
      .then((response) => {
        const data = response.data;
        setWeatherData(data.currentConditions);
        setDailyForecastData(data.days);
        setAlertsData(data.alerts || []);

        localStorage.setItem('weatherData', JSON.stringify(data));
        localStorage.setItem('cachedLocation', JSON.stringify({ city, state }));
        localStorage.setItem('lastFetched', currentTime);
      })
      .catch((error) => {
        console.error('Error fetching weather data for city and state:', error);
      });
  };

  // const fetchWeather = (city, state) => {
  //   axios
  //     .get(`/user/weatherDataByCity?city=${city}&state=${state}`)
  //     .then((response) => {
  //       console.log('Retrieved weather data:', response.data);
  //       const data = response.data;

  //       setWeatherData(data.currentConditions);
  //       setDailyForecastData(data.days);
  //       setAlertsData(data.alerts || []);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching weather data for city and state:', error);
  //     });
  // };

  const handleAvatarChange = (event) => {
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
            .patch('/user/updateAvatar', {
              avatar: newAvatarUrl,
            })
            .then((response) => {
              return setUser(response.data);
            });
        })
        .catch((err) => {
          console.error('Failed to get image url', err);
        });
    }
  };

  const handleUserNameChange = (newUserName: string) => {
    axios
      .patch('/user/updateUserName', { userName: newUserName })
      .then((response) => {
        return setUser(response.data);
      })
      .catch((error) => {
        console.error('Update User Name: Failed ', error);
      });
  };

  const handleLocationChange = (event) => {
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

  const handleBioChange = (newBio: string) => {
    axios
      .patch('/user/updateBio', { bio: newBio })
      .then((response) => {
        return setUser(response.data);
      })
      .catch((error) => {
        console.error('Update Bio: Failed ', error);
      });
  };

  const handleLogOut = () => {
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

  if (!user) {
    return <div>Loading...</div>;
  }

  // May not need
  useEffect(() => {
    if (user?.city && user?.state) {
      fetchWeather(user.city, user.state);
    }
  }, []);

  return (
    <Grid className='privateBodyGrid' w='1100px' mx='auto'>
      <TopBar />
      <Grid
        className='bodyGrid'
        border='15px solid #D3FFEB'
        borderBottom='0'
        bg='#D3FFEB'
        w='1100px'
        mx='auto'
        borderRadius='lg'
        overflow='hidden'
        boxShadow='md'
        templateRows='1fr'
        templateColumns='1fr'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='flex-end'
      >
        <UserTabs handleLogOut={handleLogOut} setCurrentView={setCurrentView} />
        <Grid
          w='1085px'
          mx='auto'
          mt='0'
          bg='#5AB78D'
          gap={10}
          overflow='hidden'
          boxShadow='md'
          templateRows='1fr'
          templateColumns='1fr'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          py={4}
        >
          {currentView === 'info' && (
            <UserInfo
              user={user}
              avatar={user.avatar}
              bio={user.bio}
              city={user.city}
              state={user.state}
              userName={user.userName}
              fetchUserData={fetchUserData}
              handleAvatarChange={handleAvatarChange}
              handleBioChange={handleBioChange}
              handleLocationChange={handleLocationChange}
              handleInputChange={handleInputChange}
              handleUserNameChange={handleUserNameChange}
            />
          )}
          {currentView === 'help' && (
            <UserPrivacy user={user} fetchUserData={fetchUserData} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserPrivateProfile;
