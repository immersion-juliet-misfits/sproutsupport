import React from 'react';
import App from './component/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { ChakraProvider } from '@chakra-ui/react';
// import ssTheme from './component/ssTheme';


const root = createRoot(document.getElementById('app'));

root.render(
  <React.StrictMode>
    {/* <ChakraProvider theme={ssTheme}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </ChakraProvider> */}
  </React.StrictMode>
);
