import axios from 'axios';
import {
  // useEffect,
  useState,
} from 'react';
import {
  // Box,
  ButtonGroup,
  Flex,
  Grid,
  // GridItem,
  // Heading,
  IconButton,
  useEditableControls,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
// import NavBar from '../NavBar';
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
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [location, setLocation] = useState({
    city: user.city || '',
    state: user.state || '',
  });

  const EditableControls = () => {
    const {
      isEditing,
      getCancelButtonProps,
      getSubmitButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup size='sm' position='absolute'>
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex position='absolute'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  };

  const fetchWeather = (city, state) => {
    axios
      .get(`/user/weatherDataByCity?city=${city}&state=${state}`)
      .then((response) => {
        console.log('Retrieved weather data:', response.data);
        const data = response.data;

        setWeatherData(data.currentConditions);
        setDailyForecastData(data.days);
        setAlertsData(data.alerts || []);
      })
      .catch((error) => {
        console.error('Error fetching weather data for city and state:', error);
      });
  };

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
    event.preventDefault();
    fetchWeather(location.city, location.state);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  // const handleLocationChange = (event) => {
  //   event.preventDefault();

  //   const { name, value } = event.target;

  //   if (name === 'city' || name === 'state') {
  //     setLocation((prevLocation) => ({
  //       ...prevLocation,
  //       [name]: value,
  //     }));
  //   } else {
  //     fetchWeather(location.city, location.state);
  //   }
  // };

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
        borderRadius='lg lg 0 0'
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
      </Grid>
      <Grid
        w='1100px'
        mx='auto'
        mt='0'
        borderRadius='0 0 lg lg'
        // border='15px solid red'
        border='15px solid #D3FFEB'
        borderTop='0'
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
            fetchUserData={fetchUserData}
            user={user}
            avatar={user.avatar}
            bio={user.bio}
            city={user.city}
            state={user.state}
            userName={user.userName}
            EditableControls={EditableControls}
            handleAvatarChange={handleAvatarChange}
            handleBioChange={handleBioChange}
            handleLocationChange={handleLocationChange}
            handleInputChange={handleInputChange}
            handleUserNameChange={handleUserNameChange}
          />
        )}
        {currentView === 'help' && <UserPrivacy />}
      </Grid>
    </Grid>
  );
};

export default UserPrivateProfile;
