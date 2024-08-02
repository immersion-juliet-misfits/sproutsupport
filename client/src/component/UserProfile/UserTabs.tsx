import { Box, Button, Grid, GridItem } from '@chakra-ui/react';

const UserTabs = ({ handleLogOut }) => {
  return (
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
          User Info - Verifying Component
        </Button>
      </GridItem>
    </Grid>
  );
};

export default UserTabs;
