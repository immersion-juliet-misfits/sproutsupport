import { Grid, GridItem, Image } from '@chakra-ui/react';
import NavBar from '../NavBar';
import '@fontsource/nerko-one';

const TopBar = ({ route }: { route: string }) => {
  // * V2 ******
  return (
    <Grid id='topBar-grid'>
      <GridItem id='topBar-gridItem' className='tb-gi-one'>
        {/* Change this to dynamic bucket name use  */}
      <Image
              id='logo-text'
              src='https://sproutsupportbucket.s3.us-east-2.amazonaws.com/icon-sprout-support-yestext.png'
              alt='Website Logo with Text'
            />
        {/* Sprout Support */}
      </GridItem>

      <GridItem id='topBar-gridItem' className='tb-gi-two'>
        <NavBar />
      </GridItem>
    </Grid>
  );

};

export default TopBar;
