import {
  // Box,
  // Editable,
  // EditableInput,
  Grid,
  GridItem,
  Heading,
  // Input,
} from '@chakra-ui/react';
// import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

const UserHelp = () => {
  return (
    <>
      <Grid>
        <GridItem bg='green.500' h='100px'>
          <Heading as='h1' size='2xl'>
            Help Placeholder
          </Heading>
        </GridItem>
      </Grid>
      <Grid
        // border='5px solid red'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
        <GridItem bg='green.500' h='100px'>
          Placeholder
        </GridItem>
        <GridItem bg='green.500' h='100px'>
          Placeholder
        </GridItem>
        <GridItem bg='green.500' h='200px'>
          Placeholder
        </GridItem>
      </Grid>
    </>
  );
};

export default UserHelp;
