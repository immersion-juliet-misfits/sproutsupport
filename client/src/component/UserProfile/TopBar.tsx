import {
  Box,
  // ButtonGroup,
  // Flex,
  Grid,
  GridItem,
  Heading,
  // IconButton,
  // useEditableControls,
} from '@chakra-ui/react';
import NavBar from '../NavBar';

const TopBar = () => {
  return (
    <Grid
      // border='5px solid blue'
      className='header-grid'
      mt={10}
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(5, 1fr)'
      h='100px'
      gap={4}
      mb={4}
    >
      <GridItem
        colSpan={1}
        bg='#488B49'
        borderRadius='lg'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Box
          w='100px'
          h='100px'
          color='white'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          Logo
        </Box>
      </GridItem>
      <GridItem
        colSpan={3}
        bg='#C5E063'
        boxShadow='md'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Heading as='h1' size='2xl'>
          Sprout Support
        </Heading>
      </GridItem>
      <GridItem
        colSpan={1}
        bg='#488B49'
        borderRadius='lg'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Box
          w='100px'
          h='100px'
          color='white'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <NavBar />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default TopBar;
