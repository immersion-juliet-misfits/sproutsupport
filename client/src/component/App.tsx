import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Home";
import CreatePost from "./Post/CreatePost";
import OwnedPlants from "./PlantCare/OwnedPlants";
import PlantFinder from "./PlantCare/PlantFinder";
import { ChakraProvider } from '@chakra-ui/react';
import Login from './Login';
import PrivateProfile from './UserProfile/privateProfile';
import Meetup from "./meetup/Meetup";
import Post from './Post';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // use react context later
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Users authentication status
    fetch('/api/checkAuth')
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.isAuthenticated);
        setUser(data.currentUser);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Login Status Fetch: Failed', err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider>
      <div className='App'>
        Sprout Support
        {isAuthenticated && <PrivateProfile onLogout={handleLogout} />}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/home'
            element={isAuthenticated ? <Home /> : <Navigate to='/login' />}
          />
          <Route path='/createPost' element={<CreatePost user={user} />} />
          <Route path='/myplants' element={<OwnedPlants user={user}/>}></Route>
          <Route path='/plantfinder' element={<PlantFinder user={user}/>}></Route>
          <Route
            path='/'
            element={<Navigate to={isAuthenticated ? '/home' : '/login'} />}
          />
          <Route path='/meetup' element={<Meetup />} />
        </Routes>
      </div>
     </ChakraProvider>
  );
};

export default App;
