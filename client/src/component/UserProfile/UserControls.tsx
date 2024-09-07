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

interface GlobalState {
  isEditMode: boolean;
  isEditModeWeather: boolean;
  editableUserName: string;
  editableBio: string;
  apiError: boolean;
  weatherData: object;
  dailyForecastData: object;
  alertsData: object;
  location: Location;
}

interface GlobalStateContextProps {
  state: GlobalState;
  setState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

const defaultState: GlobalState = {
  isEditMode: false,
  isEditModeWeather: false,
  editableUserName: '',
  editableBio: '',
  apiError: false,
  weatherData: null,
  dailyForecastData: null,
  alertsData: null,
  location: {
    city: '',
    state: '',
  },
};

const GlobalStateContext = createContext<GlobalStateContextProps>({
  state: defaultState,
  setState: () => {},
});

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GlobalState>(defaultState);

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// User Methods: Data Retrieval *******************************************
// *********

// WIP: Fetch User data by ID (for viewing another Users profile)

const getPublicUserData = (userId: number, setUser: (user: object) => void) => {
  axios
    .get(`/user/public/${userId}`)
    .then(({ data }) => {
      setUser(data);
    })
    .catch((err) => {
      console.error('Fetch Other User Profile Data: Failed ', err);
    });
};

// *********
// Global WIP ******

// const fetchWeather = () => {
//   const { state, setState } = useGlobalState();
//   const { city, state: locationState } = state.location;

//   if (!city || !locationState) {
//     console.error('City or State is undefined.');
//     return;
//   }

//   axios
//     .get(`/user/weatherDataByCity?city=${city}&state=${locationState}`)
//     .then((response) => {
//       const data = response.data;

//       setState((prevState) => ({
//         ...prevState,
//         weatherData: data.currentConditions,
//         dailyForecastData: data.days,
//         alertsData: data.alerts || [],
//       }));
//     })
//     .catch((err) => {
//       console.error('Error fetching weather data for city and state:', err);
//       setState((prevState) => ({
//         ...prevState,
//         apiError: true,
//       }));
//     });
// };

// **********

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
      // console.log('Response Check: ', data);

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
      // console.log('1 User Forum Data Check: ', data);
      setPosts(data);
    })
    .catch((err) => {
      console.error('Failed to GET posts: ', err);
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

// User Methods: Data Altering  *******************************************

// ************
// Global WIP
// const handleAvatarChange = (event, BUCKET_NAME) => {
//   const { state, setState } = useGlobalState();
//   const file = event.target.files[0];

//   if (file) {
//     axios
//       .get('/upload/url', { params: { filename: file.name } })
//       .then(({ data }) => {
//         return axios.put(data, file, {
//           headers: { 'Content-Type': file.type },
//         });
//       })
//       .then(() => {
//         const newAvatarUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${file.name}`;
//         return axios.patch('/user/updateAvatar', { avatar: newAvatarUrl });
//       })
//       .then((response) => {
//         setState((prevState) => ({
//           ...prevState,
//           editableUserName: response.data.userName,
//         }));
//       })
//       .catch((err) => {
//         console.error('Failed to get image url', err);
//         setState((prevState) => ({
//           ...prevState,
//           apiError: true,
//         }));
//       });
//   }
// };

// ******

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

// ************

// Global WIP
// const handleUserNameChange = (newUserName) => {
//   const { setState } = useGlobalState();

//   axios
//     .patch('/user/updateUserName', { userName: newUserName })
//     .then((response) => {
//       setState((prevState) => ({
//         ...prevState,
//         editableUserName: response.data.userName,
//       }));
//     })
//     .catch((error) => {
//       console.error('Update User Name: Failed ', error);
//     });
// };

// ******

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

// ************
// Global WIP
// const handleBioChange = (newBio) => {
//   const { setState } = useGlobalState();

//   axios
//     .patch('/user/updateBio', { bio: newBio })
//     .then((response) => {
//       setState((prevState) => ({
//         ...prevState,
//         editableBio: response.data.bio,
//       }));
//     })
//     .catch((error) => {
//       console.error('Update Bio: Failed ', error);
//     });
// };

// ******

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

// ************

// Combining all Edit functions

// ************

// Global WIP
// const handleLogOut = (onLogout, navigate) => {
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

// ******

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

// ************

// Export all functions in a single object
export default {
  fetchWeather,
  getPublicUserData,
  getPlants,
  getPosts,
  getMeetups,
  handleAvatarChange,
  handleUserNameChange,
  handleBioChange,
  handleLocationChange,
  handleLogOut,
  handleToggle,
  // handleSaveEdits,
  // useGlobalState,
  // GlobalStateProvider,
};
