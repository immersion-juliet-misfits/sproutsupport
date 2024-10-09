// Temp input component for working on User profiles
import { useState } from 'react';
import { Input, Button, Heading, Text, HStack, VStack } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
// temp import
// import axios from 'axios';
import UserControls from './UserControls';

const UserInput = () => {
  const [username, setUsername] = useState('');
  const isInputEmpty = username.trim() === '';
  // Confirm if User is in database
  const [userExists, setUserExists] = useState(true);

  // Move to UserControls later
  // const checkUserExists = () => {
  //   axios
  //     .get(`/user/public/${username}`)
  //     .then(({ data }) => {
  //       if (data) {
  //         setUserExists(true);
  //         window.location.href = `/public-profile/${username}`; // Navigate ONLY if the user exists
  //       } else {
  //         setUserExists(false);
  //       }
  //     })
  //     .catch(() => {
  //       setUserExists(false);
  //     });
  // };

  return (
    <VStack>
      <Heading
        id='g-heading'
        className='u-heading'
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
        {/* <Link to={userExists ? `/public-profile/${username}` : '#'}>
          <Button isDisabled={isInputEmpty}>Search</Button>
        </Link> */}
        <Button
          isDisabled={isInputEmpty}
          // onClick={checkUserExists}
          onClick={() => UserControls.checkUserExists(username, setUserExists)}
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
            {/* <Heading className='u-text-alert'>There is no User by the name: {username}</Heading> */}
          </div>
        )}
      </HStack>

    </VStack>
  );
};

export default UserInput;
