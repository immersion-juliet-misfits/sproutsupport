import { Tabs, TabList, Tab } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';

const UserTabs = ({ handleLogOut, goToPublicProfile, setCurrentView }) => {
  // const navigate = useNavigate();

  return (
    <Tabs variant='enclosed' isFitted w='95%' defaultIndex={3}>
      <TabList h='100px'>
        <Tab _selected={{ bg: '#c1e3c9' }} onClick={handleLogOut}>Log Out</Tab>
        <Tab _selected={{ bg: '#c1e3c9' }} onClick={goToPublicProfile}>Public Profile</Tab>
        <Tab _selected={{ bg: '#c1e3c9' }} onClick={() => setCurrentView('help')}>Site Help</Tab>
        <Tab _selected={{ bg: '#c1e3c9' }} onClick={() => setCurrentView('info')}>User Info</Tab>
      </TabList>
    </Tabs>
  );
};

export default UserTabs;
