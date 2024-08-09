import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex } from '@chakra-ui/react';
import { IconButton, Image } from '@chakra-ui/react';
import {
  Input,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  ButtonGroup,
  useEditableControls,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Comment from './Comment';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  const getPosts = () => {
    axios
      .get('/post/post')
      .then(({ data }) => {
        // console.log('data', data);
        setPosts(data);
      })
      .catch((err) => {
        console.error('Failed to GET post: ', err);
      });
  };

  const updateMessage = (id: string) => {
    axios
      .patch(`/post/post/${id}`, { message })
      .then((data) => {
        getPosts();
      })
      .catch((err) => {
        console.error('Failed to Update message: ', err);
      });
  };

  const deleteMessage = (id: string) => {
    axios
      .delete(`/post/post/${id}`)
      .then(() => {
        getPosts();
      })
      .catch((err) => {
        console.error('Failed to Delete message: ', err);
      });
  };

  const handleDelete = (id: string) => {
    deleteMessage(id);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box alignContent='space-evenly'>
      <ul>
        {posts
          .map((post) => {
            return (
              <li key={post.id}>
                <Flex
                  flexDirection='column-reverse'
                  alignItems='center'
                  border='revert-layer'
                >
                  <Box>
                    <Comment postId={post.id}/>
                  </Box>
                  <Box>
                    <Image
                      src={post.imageUrl}
                      // sizes='(max-width: 40px) 80px, 120px'
                      boxSize='180px'
                    />
                    <Editable
                      textAlign='center'
                      defaultValue={post.message}
                      onSubmit={() => {
                        updateMessage(post.id);
                      }}
                      onChange={(newMessage) => {
                        setMessage(newMessage);
                      }}
                      fontSize='2xl'
                      isPreviewFocusable={false}
                    >
                      <EditablePreview />
                      <Input as={EditableInput} />
                      <EditableControls />
                    </Editable>
                    <IconButton
                      variant='solid'
                      aria-label='Done'
                      fontSize='20px'
                      onClick={() => {
                        handleDelete(post.id);
                      }}
                      icon={<DeleteIcon />}
                    />
                  </Box>
                </Flex>
              </li>
            );
          })
          .reverse()}
      </ul>
    </Box>
  );
};

export default Post;
