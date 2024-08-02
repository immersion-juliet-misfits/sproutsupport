import { Box, Grid, GridItem } from '@chakra-ui/react';

const UserInfo = ({ onAvatarChange }) => {
  // Placeholder
  // const handleAvatarChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     // Handle the file upload logic here
  //     console.log('Selected file:', file);
  //   }
  // };

  return (
<Grid
            h='100%'
            templateRows='repeat(4, 1fr)'
            templateColumns='repeat(1, 1fr)'
            gap={4}
          >
            <GridItem
              bg='yellow.500'
              display='flex'
              alignItems='center'
              justifyContent='center'
              justifySelf='center'
              alignSelf='center'
              borderRadius='50%'
              w='150px'
              h='150px'
              position='relative'
              overflow='hidden'
              cursor='pointer'
              onClick={() => document.getElementById('avatarInput').click()}
            >
              <Box
                w='90%' // Temp 90% so I can see
                h='90%'
                bg='green.500'
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                This needs to be a circle
              </Box>
              <input
                type='file'
                id='avatarInput'
                style={{ display: 'none' }}
                // onChange={handleAvatarChange} // Placeholder for Avatar editing
              />
            </GridItem>
            <GridItem bg='green.500'>TESTING</GridItem>
            <GridItem bg='green.500' />
            <GridItem bg='green.500' />
          </Grid>
  );
};

export default UserInfo;