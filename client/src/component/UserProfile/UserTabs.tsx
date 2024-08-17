import { Tabs, TabList, Tab } from '@chakra-ui/react';

const UserTabs = ({ handleLogOut, setCurrentView }) => {
  return (
    <Tabs
      className='UserTabs'
      variant='enclosed'
      isFitted
      w='100%'
      // defaultIndex={2}
    >
      <TabList className='UserTabList'>
        <Tab className='uTab' onClick={handleLogOut}>
          Log Out
        </Tab>
        <Tab className='uTab' onClick={() => setCurrentView('help')}>
          Privacy
        </Tab>
        <Tab className='uTab' onClick={() => setCurrentView('info')}>
          Info
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default UserTabs;
