import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import Home from "./Home";
import CreatePost from "./CreatePost";

const App = () => {
  return (
    <ChakraProvider>
      <div className='App'>
        <Routes >
          <Route path='/' element={<Home />}/>
          <Route path='/createPost' element={<CreatePost />}/>
        </Routes>
      </div>
    </ChakraProvider>
  );
};

export default App;
