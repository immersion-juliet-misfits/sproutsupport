import { Tabs, TabList, Tab } from '@chakra-ui/react';

const UserTabs = ({ handleLogOut, setCurrentView }) => {
  return (
    <Tabs
      id='g-tabs'
      className='uTabs'
      variant='enclosed'
      isFitted
      w='100%'
      defaultIndex={2}
    >
      <TabList
      id='g-tabList'
      className='UserTabList'
      >
        <Tab className='uTab' onClick={handleLogOut}>
          Log Out
        </Tab>
        <Tab className='uTab' onClick={() => setCurrentView('help')}>
          Privacy
        </Tab>
        <Tab className='uTab' onClick={() => setCurrentView('info')}>
          Profile Display
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default UserTabs;
