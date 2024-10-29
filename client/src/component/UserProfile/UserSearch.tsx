import { useState } from 'react';
import { Input, Button, Heading, Text, HStack, VStack } from '@chakra-ui/react';
import UserControls from './UserControls';

const UserSearch = () => {
  const [username, setUsername] = useState('');
  const isInputEmpty = username.trim() === '';
  const [userExists, setUserExists] = useState(true);

  return (
    <VStack>
      <Heading
        id='g-heading'
        className='u-heading'
        marginTop='20px'
      >
        Search for other Users to View their Profiles
      </Heading>

      <HStack
        className='u-search-hstack'
        alignItems='center'
      >
        <Input
          id='g-input'
          className='u-input'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter Username'
        />
        <Button
          isDisabled={isInputEmpty}
          onClick={() => UserControls.goToUserProfile(username, setUserExists)}
        >
          Search
        </Button>
      </HStack>

      <HStack height='15px'>
        {!userExists && !isInputEmpty && (
          <div>
            <Text className='u-text-alert'>
              There is no User that goes by: {username}
            </Text>
          </div>
        )}
      </HStack>
    </VStack>
  );
};

export default UserSearch;
