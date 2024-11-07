import { Grid, GridItem, Image } from '@chakra-ui/react';
import NavBar from '../NavBar';
import '@fontsource/nerko-one';

const TopBar = ({ route }: { route: string }) => {
  return (
    <Grid id='topBar-grid'>
      <GridItem id='topBar-gridItem' className='tb-gi-one'>
      <Image
              id='logo-text'
              src='https://ssupportbucket.s3.us-east-2.amazonaws.com/icon-sprout-support-yestext.png'
              alt='Website Logo with Text'
            />
      </GridItem>

      <GridItem id='topBar-gridItem' className='tb-gi-two'>
        <NavBar />
      </GridItem>
    </Grid>
  );

};

export default TopBar;
