import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Global User states WIP ****************************************
interface Location {
  city: string;
  state: string;
}

interface GlobalState {
  isEditMode: boolean;
  editableUserName: string;
  editableBio: string;
  apiError: boolean;
  weatherData: any;
  dailyForecastData: any;
  alertsData: any;
  location: Location;
}

interface GlobalStateContextProps {
  state: GlobalState;
  setState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

const defaultState: GlobalState = {
  isEditMode: false,
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

// *****

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

// ************

const getPlants = (user, setPlants) => {
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

const getPosts = (setPosts) => {
  axios
    .get('/post/post')
    .then(({ data }) => {
      // console.log('Forum data', data);
      setPosts(data);
    })
    .catch((err) => {
      console.error('Failed to GET post: ', err);
    });
};

const getMeetups = (user, setMyMeetups): void => {
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

// ************

const handleLocationChange = (newCity, newState, setUser) => {

  console.log('Request: Hello World');
  console.log('Location UpdateCheck: ', newCity, newState);

  axios
  .patch('/user/updateLocation', { city: newCity, state: newState })
  .then((response) => {

      console.log('Response Check: ', response);

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
// * V1 ******

const handleSaveEdits = (
  editableUserName: string,
  editableBio: string,
  location: { city: string; state: string },
  setWeatherData: Function,
  setDailyForecastData: Function,
  setAlertsData: Function,
  setIsEditMode: Function,
  setUser: Function
) => {
  // Start with a resolved Promise to begin the chain
  Promise.resolve()
    // Handle username change
    .then(() => {
      if (editableUserName.trim() !== "") {
        return handleUserNameChange(editableUserName, setUser);
      }
    })
    // Handle bio change
    .then(() => {
      if (editableBio.trim() !== "") {
        return handleBioChange(editableBio, setUser);
      }
    })
    // Handle location change and fetch weather data
    .then(() => {
      if (location.city && location.state) {
        return fetchWeather(
          location.city,
          location.state,
          setWeatherData,
          setDailyForecastData,
          setAlertsData
        );
      }
    })
    // Reset isEditMode to false
    .then(() => {
      setIsEditMode(false);
    })
    .catch((error) => {
      console.error("Error saving edits:", error);
    });
};


// * V2 ******

// const handleSaveEdits = (e) => {
//   e.preventDefault();
//   // Handle username change
//   if (editableUserName) {
//     handleUserNameChange(editableUserName);
//     setEditableUserName('');
//   }
//   // Handle bio change
//   if (editableBio) {
//     handleBioChange(editableBio);
//     setEditableBio('');
//   }
//   // Handle location change and fetch weather data
//   if (location.city && location.state) {
//     UserControls.fetchWeather(
//       location.city,
//       location.state,
//       setWeatherData,
//       setDailyForecastData,
//       setAlertsData
//     );
//   }
//   // Reset isEditMode to false after saving edits
//   setIsEditMode(false);
// };

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
  handleAvatarChange,
  handleUserNameChange,
  handleBioChange,
  handleLocationChange,
  handleSaveEdits,
  handleLogOut,
  handleToggle,
  getPlants,
  getPosts,
  getMeetups,
  // useGlobalState,
  // GlobalStateProvider,
};
