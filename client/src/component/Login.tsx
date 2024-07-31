import React from 'react';
import { Button } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';

const Login: React.FC = () => {
  return (
    <>
      <h4>Welcome to Sprout Support!</h4>
      <form action="/auth/google" method="GET">
        <Button leftIcon={<FaGoogle />} colorScheme="blue" variant="outline" type="submit">
          Google Sign In
        </Button>
      </form>
    </>
  );
};

export default Login;
