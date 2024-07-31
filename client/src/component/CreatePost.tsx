import { SetStateAction, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react';
import { IconButton, Card } from '@chakra-ui/react';
import axios from 'axios';

interface post {
  userId: number,
  image_id: number,
  message: string,
  image: number,
  comments: Array<string>
}

const CreatePost = () => {
  const [input, setInput] = useState('');
  const [post, setPost] = useState('');

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setInput(e.target.value);

  const isError = input === '';

const addMessage = () => {
  axios.post('/post', post)
  .then((res) => {
    setPost(res.data)
  })
  .catch((err) => {
    console.error('Failed to POST message: ', err)
  })
}

  return (
    <Card>
      <FormControl isInvalid={isError}>
        <FormLabel>Post</FormLabel>
        <Input type='post' value={input} onChange={handleInputChange} />
        {!isError ? (
          <FormHelperText>Select the green button to create post.</FormHelperText>
        ) : (
          <FormErrorMessage>A post is required.</FormErrorMessage>
        )}
        <IconButton
          isRound={true}
          variant='solid'
          colorScheme='teal'
          aria-label='Done'
          fontSize='20px'
          icon={}
          onClick={addMessage}
        />
      </FormControl>
    </Card>
  );
};

export default CreatePost;
