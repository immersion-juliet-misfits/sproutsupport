import { extendTheme } from '@chakra-ui/react';

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
      'html, body': {
        backgroundColor: '#93C482',
      },
      '#lvl-one': {
        border: '25px solid #488B49',
        backgroundColor: '#488B49',
        borderRadius: '10px',
        width: '1200px',
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

      '#topBar': {
        // border: '1px solid red',
        width: '1200px',
        mx: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        display: 'grid',
        gridTemplateRows: 'repeat(1, 1fr)',
        gridTemplateColumns: 'repeat(5, 1fr)',
        height: '100px',
        gap: '15px',
      },

      '#g-button': {
        backgroundColor: '#D5E8CE',
        size: 'md',
        mb: '4',
      },

      '#g-card': {
        // backgroundColor: '#93C482',
        // backgroundColor: '#4AAD52',
        // backgroundColor: '#488B49',
        backgroundColor: '#6EB257',
        borderRadius: '10px',
        mx: 'auto',
      },

      '#g-input': {
        backgroundColor: '#D5E8CE',
        border: '5px solid #488B49',
        borderRadius: '10px',
      },

      '#g-tabs': {
        // border: '5px solid red',
        backgroundColor: '#488B49',
        borderColor: '#488B49',
        width: '100%',
        borderRadius: '10px',
      },
      '#g-tabList': {
        height: '75px',
        gap: '20px',
      },

      // *** User Styles *********

      '.pub-box': {
        // backgroundColor: '#93C482',
        // backgroundColor: '#4AAD52',
        // backgroundColor: '#6EB257',
        // border: '1px solid red',
        border: '10px solid #93C482',
        borderRadius: '10px',
        minHeight: '450px',
        width: '100%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Needed to align Heading
      },

      '.pub-heading': {
        // color: '#507255',
        color: '#D5E8CE',
        fontSize: '3rem',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px',
      },

      '.u-input': {
        height: '50px',
        width: '250px',
        margin: '10px 0 10px 0',
      },

      '.u-pages': {
        // border: '1px solid red',
        mt: '0',
        gap: '10px',
        overflow: 'hidden',
        boxShadow: 'md',
        templateRows: '1fr',
        templateColumns: '1fr',
        alignItems: 'center',
        justifyItems: 'center',
        py: '4',
      },

      '.uTabs': {
        // mb: 0,
        // pb: 0,
      },

      '#gridItem-avatar': {
        // border: '15px solid #507255',
        border: '15px solid #488B49',
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        justifySelf: 'center',
        alignSelf: 'center',
        borderRadius: '10px',
        width: '300px',
        height: '300px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      },

      '#img-avatar': {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        objectFit: 'cover',
      },

      '#gridItem-changes': {
        backgroundColor: '#93C482',
        borderRadius: '10px',
        width: '75%',
        minHeight: '220px',
      },
      '.visible': {
        visibility: 'visible',
      },
      '.hidden': {
        visibility: 'hidden',
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
