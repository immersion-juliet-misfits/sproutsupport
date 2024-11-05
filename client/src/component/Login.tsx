import React from 'react';
import { Box, Button, Card, CardHeader, Image, Text } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import colors from './colors';
import { useColorModeValue } from '@chakra-ui/react';


const Login: React.FC = () => {
  const loginBg = useColorModeValue(colors.background.dark, colors.background.light)

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} minHeight={"100vh"}>
    <Card w='350px' mx="auto" textAlign={"center"} borderRadius="xl" bgColor={loginBg}>
      <Text className='p-text' fontFamily={"pangolin"}>Welcome to Sprout Support!</Text>
      <Image src='https://ssupportbucket.s3.us-east-2.amazonaws.com/Peter_sprout-support_textlessIcon.png?'/>
      <form action="/auth/google" method="GET">
        <Button leftIcon={<FaGoogle />} colorScheme="green" variant="outline" type="submit">
          Google Sign In
        </Button>
      </form><br></br>
    </Card>
    </Box>
  );
};

export default Login;
