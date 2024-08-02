// Temporarily only adding the logout function
// Will eventually display other Private User Profile information

// import React from 'react';
import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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
        templateRows='1fr'
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
          <Box w='100px' h='100px' bg='blue.500'>
            Square 1
          </Box>
        </GridItem>
        <GridItem
          colSpan={3}
          bg='yellow.500'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          Rectangle
        </GridItem>
        <GridItem
          colSpan={1}
          bg='blue.500'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box w='100px' h='100px' bg='blue.500'>
            Square 2
          </Box>
        </GridItem>
      </Grid>
      <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem colSpan={1} bg='papayawhip'>
          <Button
            onClick={handleLogOut}
            w='100%'
            h='100px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Log Out
          </Button>
        </GridItem>
        <GridItem colSpan={1} bg='papayawhip'>
          <Button
            w='100%'
            h='100px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Site Help
          </Button>
        </GridItem>
        <GridItem colSpan={1} bg='papayawhip'>
          <Button
            w='100%'
            h='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Privacy Preferences
          </Button>
        </GridItem>
        <GridItem colSpan={1} bg='papayawhip'>
          <Button
            w='100%'
            h='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Login Info
          </Button>
        </GridItem>
        <GridItem colSpan={4} bg='teal' h='600px'>
          <Grid
            h='100%'
            templateRows='repeat(4, 1fr)'
            templateColumns='repeat(1, 1fr)'
            gap={4}
          >
            <GridItem bg='green.500'>This needs to be round</GridItem>
            <GridItem bg='green.500' />
            <GridItem bg='green.500' />
            <GridItem bg='green.500' />
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
};

export default UserPrivateProfile;
