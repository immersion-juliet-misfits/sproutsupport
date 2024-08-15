import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'
// import { ChakraProvider } from '@chakra-ui/react';
import Home from "./Home";
import CreatePost from "./Post/CreatePost";
import OwnedPlants from "./PlantCare/OwnedPlants";
import PlantFinder from "./PlantCare/PlantFinder";
import Login from './Login';
import UserPrivateProfile from './UserProfile/UserPrivateProfile';
import UserPublicProfile from './UserProfile/UserPublicProfile';
import Meetup from "./meetup/Meetup";
import io from 'socket.io-client';
import { useToast } from '@chakra-ui/react'

const socket = io('http://localhost:8000');

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // use react context later
  const [loading, setLoading] = useState(true);

  const toast = useToast()

  const fetchUserData = () => {
    axios.get('/api/checkAuth')
      .then(({data}) => {
        setIsAuthenticated(data.isAuthenticated);
        setUser(data.currentUser);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Login Status Fetch: Failed', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch Users authentication status
    fetchUserData()

      let notif = (task) => {
        toast({
          title: `${task.taskPlant.nickname}`,
          description: `${task.taskName}`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
      }

      socket.on('overdue', notif) // task on

      return (() => {
        socket.off('overdue', notif) // then off to not double up upon re-render with update
      })
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // <ChakraProvider>
      <div className='App'>
        Sprout Support
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/home'
            element={isAuthenticated ? <Home /> : <Navigate to='/login' />}
          />
          <Route path='/createPost' element={<CreatePost user={user} />} />
          <Route path='/myplants' element={<OwnedPlants user={user}/>}></Route>
          <Route path='/plantfinder' element={<PlantFinder user={user}/>}></Route>
          <Route path='/userprofile' element={<UserPrivateProfile user={user} setUser={setUser} onLogout={handleLogout} />}></Route>
          <Route path='/public-profile' element={<UserPublicProfile user={user} />}></Route>
          <Route
            path='/'
            element={<Navigate to={isAuthenticated ? '/home' : '/login'} />}
          />
          <Route path='/meetup' element={<Meetup user={user}/>} />
        </Routes>
      </div>
  //  </ChakraProvider>
  );
};

export default App;
