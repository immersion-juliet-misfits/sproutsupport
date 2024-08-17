import { Box } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';


const NavBar = () => {
  return (
    <Box>
      <ChakraLink as={ReactRouterLink} to='/home'>
        Home
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/meetup'>
        Meet Up
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/myplants'>
        My Plants
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/userprofile'>
        Settings
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/public-profile'>
        Profile
      </ChakraLink>
      </Box>
  )
}

export default NavBar;
