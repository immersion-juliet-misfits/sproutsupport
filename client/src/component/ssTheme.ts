import { extendTheme } from '@chakra-ui/react';
import '@fontsource/nerko-one';
import '@fontsource/pangolin';
import UserStyles from './UserProfile/UserStyles';

const config = {
  initialColorMode: 'light', // or "dark" or "system"
  useSystemColorMode: true, // If you want to use the system color mode preference
};

const colors = {
  brand: {
    500: '#f00', // Light mode
    900: '#c00', // Dark mode
  },
};

const ssTheme = extendTheme({
  config,
  styles: {
    global: {
      // * Integrate Feature Styles
      ...UserStyles,

      // * Global Layout Settings
      'html, body': {
        backgroundColor: '#93C482',
      },
      '#lvl-one': {
        border: '25px solid #488B49',
        backgroundColor: '#488B49',
        borderRadius: '10px',
        width: '1100px',
        mx: 'auto',
      },
      '#lvl-two': {
        backgroundColor: '#6EB257',
        borderRadius: '10px',
        width: '100%',
        mx: 'auto',
      },
      '#lvl-three': {
        backgroundColor: '#93C482',
        borderRadius: '10px',
        mx: 'auto',
      },
      '#lvl-alert': {
        backgroundColor: '#B9DA44',
        borderRadius: '10px',
      },

      '#g-button': {
        backgroundColor: '#D5E8CE',
        size: 'md',
        mb: '5',
      },

      '#g-card': {
        backgroundColor: '#6EB257',
        borderRadius: '10px',
        mx: 'auto',
      },

      '#g-heading': {
        mx: 'auto',
        fontFamily: 'pangolin',
        fontSize: '5xl',
      },

      '#g-input': {
        backgroundColor: '#D5E8CE',
        border: '5px solid #488B49',
        borderRadius: '10px',
      },

      '#g-tabs': {
        backgroundColor: '#488B49',
        borderColor: '#488B49',
        width: '100%',
        borderRadius: '10px',
      },
      '#g-tabList': {
        height: '75px',
        gap: '20px',
      },

      // * Global Nav/Top Bar Settings

      '#topBar-grid': {
        height: '100px',
        width: '1100px',
        mx: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        display: 'grid',
        gridTemplateRows: 'repeat(1, 1fr)',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '15px',
      },

      '#topBar-gridItem': {
        bg: '#488B49',
        color: '#D5E8CE', // Also affects color of text in Hamburger menu
        borderRadius: 'lg',
        px: '50px',
      },

      '.tb-gi-one': {
        fontFamily: 'nerko one',
        fontSize: '4xl',
        gridColumn: 'span 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      '.tb-gi-two': {
        fontFamily: 'pangolin',
        fontSize: '5xl',
        gridColumn: 'span 4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },

      '.tb-gi-three': {
        bg: '#C5E063',
        color: '#507255',
        borderRadius: 'lg',
        boxShadow: 'md',
        gridColumn: 'span 3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      '#topBar-hamburger': {
        _hover: {
          borderColor: '#D5E8CE',
        },
        fontSize: '5xl',
      },

      '#topBar-icon-hamburger': {
        borderColor: '#488B49',
        bg: '#488B49',
        color: '#D5E8CE',
        boxSize: '100px',
      },

      '#topBar-hstack': {
        gap: '50px',
      },

      // Attempting to mimic settings of offSet
      '#topBar-menu': {},

      '#topBar-menuList': {
        position: 'absolute',
        top: '30px',
        left: '50px',
        // '--menu-bg': '#488B49 !important',
      },

      '.hidden': {
        visibility: 'hidden',
      },

      '.visible': {
        visibility: 'visible',
      },
    },
  },
  components: {
    Tabs: {
      variants: {
        enclosed: {
          tab: {
            fontSize: '35px',
            _selected: {
              bg: '#6EB257',
              color: '#D5E8CE',
              borderBottom: 'none',
            },
            mb: 0,
            pb: 0,
          },
        },
      },
    },
  },
  Switch: {
    baseStyle: {
      track: {
        _checked: {
          bg: 'brand.500',
        },
      },
    },
    defaultProps: {
      size: 'lg',
    },
  },
});

export default ssTheme;
