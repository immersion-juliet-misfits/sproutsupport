import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import NavBar from '../NavBar';
import '@fontsource/nerko-one';

const TopBar = () => {
  // * V2 ***
  return (
    <Grid id='topBar-grid'>
      <GridItem
        id='topBar-gridItem'
        className='tb-gi-one'
      >
        Sprout Support
      </GridItem>

      <GridItem
        id='topBar-gridItem'
        className='tb-gi-two'
      >
        <NavBar />
      </GridItem>
    </Grid>
  );

  // * V1 ***
  // return (
  //   <Grid id='topBar'>
  //     <GridItem
  //     id=''
  //       colSpan={1}
  //       bg='#488B49'
  //       borderRadius='lg'
  //       display='flex'
  //       alignItems='center'
  //       justifyContent='center'
  //     >
  //       <Box
  //         w='100px'
  //         h='100px'
  //         color='white'
  //         display='flex'
  //         alignItems='center'
  //         justifyContent='center'
  //       >
  //         Logo
  //       </Box>
  //     </GridItem>
  //     <GridItem
  //       colSpan={3}
  //       borderRadius='lg'
  //       bg='#C5E063'
  //       boxShadow='md'
  //       display='flex'
  //       alignItems='center'
  //       justifyContent='center'
  //     >
  //       <Heading as='h1' size='2xl'>
  //         Sprout Support
  //       </Heading>
  //     </GridItem>
  //     <GridItem
  //       colSpan={1}
  //       bg='#488B49'
  //       borderRadius='lg'
  //       display='flex'
  //       alignItems='center'
  //       justifyContent='center'
  //     >
  //       <Box
  //         w='100px'
  //         h='100px'
  //         color='white'
  //         display='flex'
  //         alignItems='center'
  //         justifyContent='center'
  //       >
  //         <NavBar />
  //       </Box>
  //     </GridItem>
  //   </Grid>
  // );
  // ******
};

export default TopBar;
