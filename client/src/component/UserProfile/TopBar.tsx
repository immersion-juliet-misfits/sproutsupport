import { Grid, GridItem, Heading } from '@chakra-ui/react';
import NavBar from '../NavBar';
import '@fontsource/nerko-one';

const TopBar = ({ route }: { route: string }) => {
  // * V2 ******
  // return (
  //   <Grid id='topBar-grid'>
  //     <GridItem id='topBar-gridItem' className='tb-gi-one'>
  //       Sprout Support
  //     </GridItem>

  //     <GridItem id='topBar-gridItem' className='tb-gi-two'>
  //       <NavBar />
  //     </GridItem>
  //   </Grid>
  // );

  // * V1 *****
  return (
    <Grid id='topBar-grid'>
      <GridItem id='topBar-gridItem' className='tb-gi-one'>
        Logo
      </GridItem>

      <GridItem className='tb-gi-three'>
        <Heading id='g-heading'>
          {route === undefined || route === '' ? 'Sprout Support' : route}
        </Heading>
      </GridItem>

      <GridItem id='topBar-gridItem' className='tb-gi-one'>
        <NavBar />
      </GridItem>
    </Grid>
  );

  // ******
};

export default TopBar;
