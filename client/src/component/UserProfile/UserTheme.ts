import { extendTheme } from '@chakra-ui/react';

const UserTheme = extendTheme({
  styles: {
    global: {
      '.UserTabs': {
        borderRadius: '8px',
      },
      '.UserTabList': {
        borderBottom: '5px solid #ccc',
      },
      '.uTab': {
        bg: '#c1e3c9',
        _selected: {
          bg: '#A3EECC',
        },
        borderRadius: '4px',
        padding: '8px',
        margin: '0 4px',
      },
    },
  },
});

export default UserTheme;
