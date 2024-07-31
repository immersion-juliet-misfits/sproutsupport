import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
// import OwnedPlants from "./PlantCare/OwnedPlants";
import Home from "./Home";
import CreatePost from "./CreatePost";
import Login from './Login'

const App = () => {
  return (
    <ChakraProvider>
      <div className='App'>
        <Routes >
          <Route path='/' element={<Home />}/>
          <Route path='/createPost' element={<CreatePost />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </div>
    </ChakraProvider>
  );
};

export default App;
