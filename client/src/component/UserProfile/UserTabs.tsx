import { ChakraProvider, Tabs, TabList, Tab } from '@chakra-ui/react';
import UserTheme from './UserTheme';

const UserTabs = ({ handleLogOut, goToPublicProfile, setCurrentView }) => {

  return (
    <ChakraProvider theme={UserTheme}>
    <Tabs className="UserTabs" variant='enclosed' isFitted w='95%' defaultIndex={3} >
      <TabList className="UserTabList" h='100px' gap={2}>
        <Tab className="uTab" onClick={handleLogOut}>Log Out</Tab>
        <Tab className="uTab" onClick={goToPublicProfile}>Public Profile</Tab>
        <Tab className="uTab" onClick={() => setCurrentView('help')}>Site Help</Tab>
        <Tab className="uTab" onClick={() => setCurrentView('info')}>User Info</Tab>
      </TabList>
    </Tabs>
    </ChakraProvider>
  );
};

export default UserTabs;
