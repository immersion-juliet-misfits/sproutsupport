import { Tabs, TabList, Tab } from '@chakra-ui/react';

const UserTabs = ({ handleLogOut, goToPublicProfile, setCurrentView }) => {
  return (

    <Tabs className="UserTabs" variant='enclosed' isFitted w='95%' defaultIndex={3} >
      <TabList className="UserTabList">
        <Tab className="uTab" onClick={handleLogOut}>Log Out</Tab>
        <Tab className="uTab" onClick={goToPublicProfile}>Profile</Tab>
        <Tab className="uTab" onClick={() => setCurrentView('help')}>Privacy</Tab>
        <Tab className="uTab" onClick={() => setCurrentView('info')}>Info</Tab>
      </TabList>
    </Tabs>

  );
};

export default UserTabs;
