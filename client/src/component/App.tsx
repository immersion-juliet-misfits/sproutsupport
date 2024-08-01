import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import OwnedPlants from "./PlantCare/OwnedPlants";
import PlantFinder from "./PlantCare/PlantFinder";
import { ChakraProvider } from '@chakra-ui/react';
import Meetup from "./meetup/Meetup";

const App = () => {
  return (
    <ChakraProvider>
      <div className='App'>
        <Routes >
          <Route path='/' element={<Home />}/>
          <Route path='/createPost' element={<CreatePost />}/>
          <Route path='/meetup' element={<Meetup />}/>
          <Route path="/myplants" element={<OwnedPlants />}></Route>
          <Route path="/plantfinder" element={<PlantFinder />}></Route>
        </Routes>
      </div>
    </ChakraProvider>
  );
};

export default App;
