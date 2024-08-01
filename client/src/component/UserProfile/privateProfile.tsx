// Temporarily only adding the logout function
// Will eventually display other Private User Profile information

// import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PrivateProfile = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          onLogout();
          navigate('/login');
        } else {
          console.error('Logout: Failed');
        }
      })
      .catch(err => {
        console.error('Logout: Failed', err);
      });
  };

  return (
    <Button onClick={handleLogOut}>
      Log Out
    </Button>
  );
};

export default PrivateProfile;

