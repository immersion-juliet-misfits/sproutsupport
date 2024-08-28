import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: "light", // or "dark" or "system"
  useSystemColorMode: true, // If you want to use the system color mode preference
};

const colors = {
  brand: {
    500: "#f00", // Light mode
    900: "#c00", // Dark mode
  },
};

const ssTheme = extendTheme({
  config,
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#93c482',
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
          h: '75px',
          gap: 5,
        },
      },
      variants: {
        enclosed: {
          tab: {
            fontSize: '30px',
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
