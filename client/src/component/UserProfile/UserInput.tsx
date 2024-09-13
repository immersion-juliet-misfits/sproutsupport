// Temp input component for working on User profiles
import { useState } from 'react';
import { Input, Button, Heading, Text, HStack, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const UserInput = () => {
  const [userId, setUserId] = useState('');
  const isInputEmpty = userId.trim() === '' || isNaN(Number(userId));

  return (
    <VStack>
      <Heading
        id='g-heading'
        className='u-heading'
      >
        {/* <Text className='u-text'> */}
        Search for other Users to View their Profiles
        {/* </Text> */}
      </Heading>

      <HStack>
        <Input
          id='g-input'
          className='u-input'
          type='number'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder='Enter User ID'
        />
        <Link to={`/public-profile/${userId}`}>
          <Button
            mt={4}
            isDisabled={isInputEmpty}
          >
            Submit
          </Button>
        </Link>
      </HStack>
    </VStack>
  );
};

export default UserInput;
