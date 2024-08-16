import { SetStateAction, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  IconButton,
  Button,
  Box,
  Image,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const CreatePost = ({user, BUCKET_NAME}) => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [signedUrl, setSignedUrl] = useState(null);

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setInput(e.target.value);

  const isError = input === '';


  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setImage(e.currentTarget.value);
    setImage(e.target.files[0]) // prob want entire obj
  };

  const handleUploadFile = () => {
    if (!image) {
      console.info('No image selected')
    }

    axios.get('/upload/url', { params: {filename: image.name}})
      .then(({data}) => {
        return axios.put(data, image, {
          headers: {'Content-Type': image.type}
        })
      })
      .then(() => {
        setSignedUrl(`https://${BUCKET_NAME}.s3.amazonaws.com/${image.name}`)
      })
      .catch((err) => {
        console.error('Failed to get image url', err)
      })
  }


  const addMessage = () => {
    return axios
      .post('/post/post', { message: input, userId: user.id, imageUrl: signedUrl})
      .then(() => {
      })
      .catch((err) => {
        console.error('Failed to POST message: ', err);
      });
  };

  return (
    <Box>
      <div>
      <input type="file" onChange={handleChooseFile}></input>
      <input type="button" onClick={handleUploadFile} value="Upload"></input>
      {image && <Box boxSize='100px'><img src={signedUrl} ></img></Box>}
    </div>
      <FormControl isInvalid={isError}>
        <FormLabel>Post</FormLabel>
        <Input type='post' value={input} onChange={handleInputChange} />
        {!isError ? (
          <FormHelperText>
            Press Submit to create post.
          </FormHelperText>
        ) : (
          <FormErrorMessage>A post is required.</FormErrorMessage>
        )}
        <ChakraLink as={ReactRouterLink} to='/home'>
        <Button mt={4} onClick={addMessage}>
          Submit
        </Button>
        </ChakraLink>
      </FormControl>
    </Box>
  );
};

export default CreatePost;
