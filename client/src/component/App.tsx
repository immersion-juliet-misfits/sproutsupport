import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import Post from "./Post";
import OwnedPlants from "./PlantCare/OwnedPlants";
import PlantFinder from "./PlantCare/PlantFinder";
import { ChakraProvider } from '@chakra-ui/react';


const App = () => {
    return (
    <ChakraProvider>
        <div className='App'>
        Sprout Support
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/post' element={<Post />}/>
                <Route path='/createPost' element={<CreatePost />} />
                <Route path="/myplants" element={<OwnedPlants />}></Route>
                <Route path="/plantfinder" element={<PlantFinder />}></Route>
            </Routes>
        </div>
    </ChakraProvider>
    )

};

export default App;
