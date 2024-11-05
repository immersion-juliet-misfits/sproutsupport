import { lazy, Suspense, useEffect, useState, createContext, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import io from 'socket.io-client';
import { useToast } from '@chakra-ui/react';
import ssTheme from './ssTheme';

// WIP React Context logic
const UserContext = createContext({});
export const useUser = () => useContext(UserContext);

const Home = lazy(() => import('./Home'));
const CreatePost = lazy(() => import('./Post/CreatePost'));
const OwnedPlants = lazy(() => import('./PlantCare/OwnedPlants'));
const PlantFinder = lazy(() => import('./PlantCare/PlantFinder'));
const Login = lazy(() => import('./Login'));
const UserPrivateProfile = lazy(
  () => import('./UserProfile/UserPrivateProfile')
);
const UserPublicProfile = lazy(() => import('./UserProfile/UserPublicProfile'));
const Meetup = lazy(() => import('./meetup/Meetup'));
// const PublicTest = lazy(() => import('./UserProfile/PublicTest'));
const UserSearch = lazy(() => import('./UserProfile/UserSearch'));



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // use react context later
  const [loading, setLoading] = useState(true);

  const toast = useToast();
  // const BUCKET_NAME = 'my1test1bucket';
  // const BUCKET_NAME = 'sprout-support';
  // const BUCKET_NAME = 'sproutsupportbucket'
  const BUCKET_NAME = 'ssupportbucket'

  const fetchUserData = () => {
    axios
      .get('/api/checkAuth')
      .then(({ data }) => {
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
    fetchUserData();
    
    if (user?.id) {
      const socket = io('http://localhost:8000', {
        query: { userId: user.id }
      });
      
      const notif = (task) => {
        toast({
          title: `${task.taskPlant.nickname}`,
          description: `${task.taskName}`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      };
      
      socket.on('overdue', notif); // task on
      
      return () => {
        socket.off('overdue', notif); // then off to not double up upon re-render with update
        // socket.disconnect()
      };
    }
  }, [user?.id]);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated  }}>
    <ChakraProvider theme={ssTheme}>
      <ColorModeScript initialColorMode={ssTheme.config.initialColorMode} />
      <div className='App'>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route
              path='/home'
              element={isAuthenticated ? <Home user={user}/> : <Navigate to='/login' />}
            />
            <Route
              path='/createPost'
              element={<CreatePost user={user} BUCKET_NAME={BUCKET_NAME} />}
            />
            <Route
              path='/myplants'
              element={<OwnedPlants user={user} />}
            ></Route>
            <Route
              path='/plantfinder'
              element={<PlantFinder user={user} BUCKET_NAME={BUCKET_NAME} />}
            ></Route>


            <Route
              path='/userprofile'
              element={
                <UserPrivateProfile
                  fetchUserData={fetchUserData}
                  user={user}
                  setUser={setUser}
                  onLogout={handleLogout}
                  BUCKET_NAME={BUCKET_NAME}
                />
              }
            ></Route>

<Route
  path='/enter-username'
  element={<UserSearch />}
  />

<Route
  path="/public-profile/:username"
  element={<UserPublicProfile />}
  />

            <Route
              path='/'
              element={<Navigate to={isAuthenticated ? '/home' : '/login'} />}
            />
            <Route
              path='/meetup'
              element={<Meetup user={user} BUCKET_NAME={BUCKET_NAME} />}
            />
          </Routes>
        </Suspense>
      </div>
    </ChakraProvider>
    </UserContext.Provider>
  );
};

export default App;
