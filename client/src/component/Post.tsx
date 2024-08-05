import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Box, Flex } from '@chakra-ui/react';
import { IconButton, Image } from '@chakra-ui/react';
import {
  Input,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  ButtonGroup,
  useEditableControls
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon} from '@chakra-ui/icons';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState('');
  const [message, setMessage] = useState('')

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
        setPosts(data);
      })
      .catch((err) => {
        console.error('Failed to GET post: ', err);
      });
  };

  const updateMessage = (id: string) => {
    axios
      .patch(`/post/post${id}`, {message})
      .then((data) => {
        getPosts();
      })
      .catch((err) => {
        console.error('Failed to Update message: ', err);
      });
  };

  const deleteMessage = (id: string) => {
    axios
      .delete(`/post/post${id}`)
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
    <div>
      <ul>
        {posts
          .map((post) => {
            return (
              <li key={post.id}>
                <Flex
                  flexDirection='column-reverse'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  {/* <Image>Picture</Image> */}
                  <Card>
                    <div>Picture</div>
                    <Editable
                      textAlign='center'
                      defaultValue={post.message}
                      onSubmit={() => {updateMessage(post.id)}}
                      onChange={(newMessage) => {setMessage(newMessage)}}
                      fontSize='2xl'
                      isPreviewFocusable={false}
                    >
                      <EditablePreview />
                      <Input as={EditableInput} />
                      <EditableControls />
                    </Editable>
                    <IconButton
                      isRound={true}
                      variant='solid'
                      colorScheme='red'
                      aria-label='Done'
                      fontSize='20px'
                      onClick={() => {
                        handleDelete(post.id);
                      }}
                      icon={<DeleteIcon/>}
                    />
                  </Card>
                </Flex>
              </li>
            );
          })
          .reverse()}
      </ul>
    </div>
  );
};

export default Post;
