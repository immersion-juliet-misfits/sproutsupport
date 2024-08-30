import { Box, HStack } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
// ***
import { SettingsIcon } from '@chakra-ui/icons';
import { VscAccount } from 'react-icons/vsc';
// import '@fontsource/pangolin';

const NavBar = () => {
  // * V2 ****
  return (
    <>
      <HStack id='topBar-hstack'>
        <ChakraLink as={ReactRouterLink} to='/home'>
          Home
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to='/meetup'>
          Meet Up
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to='/myplants'>
          My Plants
        </ChakraLink>
      </HStack>

      <HStack id='topBar-hstack'>
        <ChakraLink as={ReactRouterLink} to='/userprofile'>
          <SettingsIcon />
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to='/public-profile'>
          <VscAccount />
        </ChakraLink>
      </HStack>
    </>
  );

  // * V1 ****
  // return (
  //   <Box>
  //     <ChakraLink as={ReactRouterLink} to='/home'>
  //       Home
  //     </ChakraLink>
  //     <ChakraLink as={ReactRouterLink} to='/meetup'>
  //       Meet Up
  //     </ChakraLink>
  //     <ChakraLink as={ReactRouterLink} to='/myplants'>
  //       My Plants
  //     </ChakraLink>
  //     <ChakraLink as={ReactRouterLink} to='/userprofile'>
  //       Settings
  //     </ChakraLink>
  //     <ChakraLink as={ReactRouterLink} to='/public-profile'>
  //       Profile
  //     </ChakraLink>
  //   </Box>
  // );
  // ******
};

export default NavBar;
