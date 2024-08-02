import { Box } from '@chakra-ui/react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';


const Nav = () => {
  return (
    <Box>
      <ChakraLink as={ReactRouterLink} to='/home'>
        Home
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/userprofile'>
        Profile
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/meetup'>
        Meet Up
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/myplants'>
        My Plants
      </ChakraLink>
      </Box>
  )
}

export default Nav;
