// emp input component for working on User profiles
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, VStack } from '@chakra-ui/react';

const UserInput = () => {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (userId) {
      navigate(`/public-profile/${userId}`); // Navigate to dynamic route with userId
    }
  };

  return (
    <VStack>
      <Input
        type="number"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
      />
      <Button onClick={handleSubmit} mt={4}>
        Submit
      </Button>
    </VStack>
  );
};

export default UserInput;
