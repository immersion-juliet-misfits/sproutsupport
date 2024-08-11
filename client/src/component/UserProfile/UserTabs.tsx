import { Button, Grid, GridItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const UserTabs = ({ handleLogOut, goToPublicProfile, setCurrentView }) => {

  const navigate = useNavigate();

  return (
    <Grid
      h='100px'
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(5, 1fr)'
      alignItems='center'
      justifyItems='center'
      gap={10}
    >
      <GridItem colSpan={1} bg='papayawhip'>
        <Button
          onClick={handleLogOut}
          bg='#c1e3c9'
          w='175px'
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
          onClick={() => setCurrentView('help')}
          bg='#c1e3c9'
          w='175px'
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
          onClick={() => setCurrentView('privacy')}
          bg='#c1e3c9'
          w='175px'
          h='100px'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          Privacy Preferences
        </Button>
      </GridItem>
      <GridItem colSpan={1} bg='papayawhip'>
        <Button
          onClick={() => setCurrentView('info')}
          bg='#c1e3c9'
          w='175px'
          h='100px'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          User Info
        </Button>
      </GridItem>
      <GridItem colSpan={1} bg='papayawhip'>
        <Button
          onClick={goToPublicProfile}
          bg='#c1e3c9'
          w='175px'
          h='100px'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          Public Profile
        </Button>
      </GridItem>
    </Grid>
  );
};

export default UserTabs;
