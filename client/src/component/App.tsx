import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './Login';
import Home from './Home';
import CreatePost from './CreatePost';
import OwnedPlants from './PlantCare/OwnedPlants';
import PlantFinder from './PlantCare/PlantFinder';

const App = () => {
  return (
    <ChakraProvider>
      <div className='App'>
        Sprout Support
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/createPost' element={<CreatePost />} />
          <Route path='/myplants' element={<OwnedPlants />}></Route>
          <Route path='/plantfinder' element={<PlantFinder />}></Route>
          <Route path='/' element={<Navigate to='/login' />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
};

export default App;
