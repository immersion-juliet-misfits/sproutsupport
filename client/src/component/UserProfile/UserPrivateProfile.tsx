// Temporarily only adding the logout function
// Will eventually display other Private User Profile information

// import React from 'react';
import { Box, Button, Grid, GridItem, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserInfo from './UserInfo';
import UserTabs from './UserTabs';

const UserPrivateProfile = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          onLogout();
          navigate('/login');
        } else {
          console.error('Logout: Failed');
        }
      })
      .catch((err) => {
        console.error('Logout: Failed', err);
      });
  };

  return (
    <>
      <Grid
        h='100px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
        mb={4}
      >
        <GridItem
          colSpan={1}
          bg='blue.500'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            w='100px'
            h='100px'
            bg='blue.500'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Site Logo
          </Box>
        </GridItem>
        <GridItem
          colSpan={2}
          bg='yellow.500'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Heading as='h1' size='2xl'>
            USER SETTINGS
          </Heading>
        </GridItem>
        <GridItem
          colSpan={1}
          bg='blue.500'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            w='100px'
            h='100px'
            bg='blue.500'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Hamburger Nav will be passed in here
          </Box>
        </GridItem>
      </Grid>
      <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem colSpan={4} bg='teal' h='600px'>
          <UserTabs />
          <UserInfo />
        </GridItem>
      </Grid>
    </>
  );
};

export default UserPrivateProfile;
