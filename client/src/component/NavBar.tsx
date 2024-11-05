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
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons';
import { VscAccount } from 'react-icons/vsc';
import { TfiUnlock } from 'react-icons/tfi';
import { useUser } from './App';
import UserControls from './UserProfile/UserControls';
// import '@fontsource/pangolin';

const NavBar = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    UserControls.handleLogOut(() => {
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    }, navigate);
  };

  return (
    <>
      <HStack id='topBar-hstack'>
        <ChakraLink
          as={ReactRouterLink}
          to='/home'
        >
          Home
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to='/meetup'
        >
          Meet Up
        </ChakraLink>
        <ChakraLink
          as={ReactRouterLink}
          to='/myplants'
        >
          My Plants
        </ChakraLink>
      </HStack>

      <HStack id='topBar-hstack'>
        <Menu id='topBar-menu'>
          <MenuButton
            id='topBar-hamburger'
            as={IconButton}
            aria-label='Menu Options'
            icon={<HamburgerIcon id='topBar-icon-hamburger' />}
          />
          <MenuList className='topBar-menuList' zIndex={"popover"}>
            <MenuItem
              as={ReactRouterLink}
              to={`/public-profile/${user?.userName}`}
            >
              <VscAccount mr={2} />
              Profile
            </MenuItem>

            <MenuItem
              as={ReactRouterLink}
              to='/userprofile'
            >
              <SettingsIcon  />
              Settings
            </MenuItem>

            <MenuItem
              as='button'
              onClick={handleLogout}
            >
              <TfiUnlock mr={2} />
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </>
  );
};

export default NavBar;
