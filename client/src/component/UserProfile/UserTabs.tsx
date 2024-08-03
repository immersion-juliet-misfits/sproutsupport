import { Button, Grid, GridItem } from '@chakra-ui/react';

const UserTabs = ({ handleLogOut }) => {
  return (
    <Grid
      h='100px'
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(4, 1fr)'
      alignItems='center'
      justifyItems='center'
      gap={10}
    >
      <GridItem colSpan={1} bg='papayawhip'>
        <Button
          onClick={handleLogOut}
          bg='#c1e3c9'
          w='200px'
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
          bg='#c1e3c9'
          w='200px'
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
          bg='#c1e3c9'
          w='200px'
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
          bg='#c1e3c9'
          w='200px'
          h='100px'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          User Info
        </Button>
      </GridItem>
    </Grid>
  );
};

export default UserTabs;
