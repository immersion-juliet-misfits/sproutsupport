import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import Home from "./Home";
import CreatePost from "./CreatePost";
import Meetup from "./meetup/Meetup";

const App = () => {
  return (
    <ChakraProvider>
      <div className='App'>
        <Routes >
          <Route path='/' element={<Home />}/>
          <Route path='/createPost' element={<CreatePost />}/>
          <Route path='/meetup' element={<Meetup />}/>
        </Routes>
        {/* <Meetup /> */}
      </div>
    </ChakraProvider>
  );
};

export default App;
