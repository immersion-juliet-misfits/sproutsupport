import {
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
// ***
import { SettingsIcon } from '@chakra-ui/icons';
import { VscAccount } from 'react-icons/vsc';
// import '@fontsource/pangolin';
import { useUser } from './App';

const NavBar = () => {
  const { user, isAuthenticated } = useUser();


  // * V2 ****
  return (
    <>
      <HStack id='topBar-hstack' >
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
        {/* <ChakraLink as={ReactRouterLink} to={`/public-profile/${user?.id}`}> */}
        <ChakraLink as={ReactRouterLink} to={`/public-profile/${user?.userName}`}>
          <VscAccount />
        </ChakraLink>
      </HStack>
    </>
  );

  // * V1 ****
  // return (
  //   <Menu
  //     id='topBar-menu'
  //     // offset={[65, 25]} // Need to add to ssTheme
  //   >
  //     <MenuButton
  //       id='topBar-hamburger'
  //       as={IconButton}
  //       aria-label='Menu Options'
  //       icon={<HamburgerIcon id='topBar-icon-hamburger' />}
  //     />
  //     <MenuList className='topBar-menuList'>
  //       <MenuItem as={ReactRouterLink} to='/home'>
  //         Home
  //       </MenuItem>
  //       <MenuItem as={ReactRouterLink} to='/meetup'>
  //         Meet Up
  //       </MenuItem>
  //       <MenuItem as={ReactRouterLink} to='/myplants'>
  //         My Plants
  //       </MenuItem>
  //       <MenuItem as={ReactRouterLink} to='/userprofile'>
  //         <SettingsIcon mr={2} />
  //         Settings
  //       </MenuItem>
  //       <MenuItem as={ReactRouterLink} to={`/public-profile/${user?.id}`}>
  //         <VscAccount mr={2} />
  //         Profile
  //       </MenuItem>
  //     </MenuList>
  //   </Menu>
  // );

  // * V0 ****
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
  //     <ChakraLink as={ReactRouterLink} to={`/public-profile/${user?.id}`}>
  //       Profile
  //     </ChakraLink>
  //   </Box>
  // );

  // ******
};

export default NavBar;
