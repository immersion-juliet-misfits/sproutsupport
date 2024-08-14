import { extendTheme } from '@chakra-ui/react';

const ssTheme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#A3EECC',
      },
    },
  },
  components: {
    Tabs: {
      baseStyle: {
        tab: {
          bg: '#A3EECC',
          mb: '0',
          pb: '0',
        },
        tablist: {
          h: '150px',
          gap: 5,
        },
      },
      variants: {
        enclosed: {
          tab: {
            fontSize: '50px',
            _selected: {
              bg: '#A3EECC',
              color: 'white',
            },
          },
        },
      },
    },
  },
});

export default ssTheme;
