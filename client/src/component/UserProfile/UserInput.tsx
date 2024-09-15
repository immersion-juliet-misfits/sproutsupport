// Temp input component for working on User profiles
import { useState } from 'react';
import { Input, Button, Heading, HStack, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const UserInput = () => {
  // const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  // const isInputEmpty = userId.trim() === '' || isNaN(Number(userId));
  const isInputEmpty = username.trim() === '';

  return (
    <VStack>
      <Heading
        id='g-heading'
        className='u-heading'
      >
        Search for other Users to View their Profiles
      </Heading>

      <HStack>
        <Input
          id='g-input'
          className='u-input'
          // type='number'
          type='text'
          // value={userId}
          value={username}
          // onChange={(e) => setUserId(e.target.value)}
          // placeholder='Enter User ID'
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter Username'
        />
        {/* <Link to={`/public-profile/${userId}`}> */}
        <Link to={`/public-profile/${username}`}>
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
