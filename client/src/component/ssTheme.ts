import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import '@fontsource/nerko-one';
import '@fontsource/pangolin';
import colors from './colors';
import UserStyles from './UserProfile/UserStyles';

const config = {
  initialColorMode: 'light', // or "dark" or "system"
  useSystemColorMode: true, // If you want to use the system color mode preference
};

const ssTheme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      ...UserStyles(props),

      // * Global Style Settings
      'html, body': {
        backgroundColor: mode(
          colors.background.light,
          colors.background.dark
        )(props),
      },
      '#lvl-one': {
        border: '25px solid',
        borderColor: mode(colors.levelOne.light, colors.levelOne.dark)(props),
        backgroundColor: mode(
          colors.levelOne.light,
          colors.levelOne.dark
        )(props),
        borderRadius: '10px',
        width: '1100px',
        mx: 'auto',
      },
      '#lvl-two': {
        backgroundColor: mode(
          colors.levelTwo.light,
          colors.levelTwo.dark
        )(props),
        borderRadius: '10px',
        width: '100%',
        mx: 'auto',
      },
      '#lvl-three': {
        backgroundColor: mode(
          colors.levelThree.light,
          colors.levelThree.dark
        )(props),
        borderRadius: '10px',
        mx: 'auto',
      },
      '#lvl-alert': {
        backgroundColor: mode(colors.alert.light, colors.alert.dark)(props),
        borderRadius: '10px',
      },

      '#g-button': {
        backgroundColor: mode(colors.button.light, colors.button.dark)(props),
      },

      '#g-card': {
        backgroundColor: mode(
          colors.levelTwo.light,
          colors.levelTwo.dark
        )(props),
        borderRadius: '10px',
        mx: 'auto',
      },

      '#g-heading': {
        mx: 'auto',
        fontFamily: 'nerko one',
      },

      '#g-hstack': {
        margin: 'auto',
      },

      '#g-input': {
        border: '5px solid',
        borderRadius: '10px',
        borderColor: mode(colors.levelOne.light, colors.levelOne.dark)(props),
        backgroundColor: mode(colors.button.light, colors.button.dark)(props),
      },

      '#g-link': {
        color: mode(colors.text.light, colors.text.dark)(props),
        fontFamily: 'pangolin',
      },

      '#g-tabs': {
        width: '100%',
        borderRadius: '10px',
      },
      '#g-tabList': {
        height: '75px',
        gap: '20px',
      },

      '#g-vstack': {
        margin: 'auto',
      },

      // *** Global Nav/Top Bar Settings ***
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
        bg: mode(colors.levelOne.light, colors.levelOne.dark)(props),
        // Below also affects color of text in Hamburger menu
        color: mode(colors.text.light, colors.text.dark)(props),
        borderRadius: 'lg',
        // px: '50px', // for the Text placeholder for the logo
      },

      '#logo-text': {
        filter: 'invert(76%) sepia(16%) saturate(797%) hue-rotate(60deg) brightness(95%) contrast(85%)',
      },

      '#g-box': {
        bg: mode(colors.levelOne.light, colors.levelOne.dark)(props),
        color: mode(colors.text.light, colors.text.dark)(props),
        borderRadius: '10px',
        fontFamily: 'pangolin',
      },
      '#p-button': {
        bgColor: mode(colors.text.light, colors.text.dark)(props),
        color: mode(colors.text.dark, colors.text.light)(props),
        borderRadius: '10px',
        _hover: {
          color: '#6EB257',
        },
      },
      '#p-input': {
        bgColor: mode(colors.text.light, colors.text.dark)(props),
        color: mode(colors.text.dark, colors.text.light)(props),
        borderRadius: '10px',
      },
      '#p-input2': {
        bgColor: mode(colors.text.light, colors.text.dark)(props),
        color: '#B9DA44',
        borderRadius: '10px',
        _placeholder: {
          color: '#67723E',
        },
      },
      '#p-icon': {
        color: mode(colors.text.dark, colors.text.light)(props),
        borderRadius: '10px',
      },
      '#p-form': {
        bgColor: mode(colors.text.light, colors.text.dark)(props),
        color: mode(colors.text.dark, colors.text.light)(props),
        borderRadius: '10px',
      },

      '.g-font': {
        fontFamily: 'pangolin',
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
        bg: mode(colors.tbGiThree.bg.light, colors.tbGiThree.bg.dark)(props),
        color: mode(
          colors.tbGiThree.text.light,
          colors.tbGiThree.text.dark
        )(props),
        borderRadius: 'lg',
        boxShadow: 'md',
        gridColumn: 'span 3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      '#topBar-hamburger': {
        _hover: {
          borderColor: mode(colors.text.light, colors.text.dark)(props),
        },
        fontSize: '5xl',
      },

      '#topBar-icon-hamburger': {
        bg: mode(colors.levelOne.light, colors.levelOne.dark)(props),
        borderColor: mode(colors.levelOne.light, colors.levelOne.dark)(props),
        color: mode(colors.text.light, colors.text.dark)(props),
        boxSize: '100px',
      },

      '#topBar-hstack': {
        gap: '50px',
        m: 'auto',
      },

      // Attempting to mimic settings of offSet
      '#topBar-menu': {
        bg: mode(colors.levelOne.light, colors.levelOne.dark)(props),
      },

      '#topBar-menuList': {
        position: 'absolute',
        top: '30px',
        left: '50px',
      },

      '.hidden': {
        visibility: 'hidden',
      },

      '.visible': {
        visibility: 'visible',
      },

      '.bodyGrid': {

      },

      '#post-box': {
        border: '1px solid',
        borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
        borderRadius: '10px',
        width: '99%',
        padding: '10px',
        alignItems: 'left',
        margin: '10px',
        fontFamily: 'pangolin',
      },

      '#post-card': {
        border: mode(
          colors.levelTwo.light,
          colors.levelTwo.dark
        )(props),
        backgroundColor: mode(
          colors.levelTwo.light,
          colors.levelTwo.dark
        )(props),
      },

      '#post-flex': {
        borderRadius: '10px',
        margin:'5px',
        padding:'5px',
        bg: mode(colors.levelThree.light, colors.levelThree.dark)(props),
      },

    }),
  },
  components: {
    Button: {
      variants: {
        solid: (props) => ({
          bg: mode(colors.button.light, colors.button.dark)(props),
          _active: {
            bg: mode(colors.levelTwo.light, colors.levelTwo.dark)(props),
          },
        }),
      },
    },
    Tabs: {
      variants: {
        enclosed: (props) => ({
          tab: {
            fontSize: '35px',
            color: mode(colors.levelThree.light, colors.levelThree.dark)(props),
            _selected: {
              bg: mode(colors.levelTwo.light, colors.levelTwo.dark)(props),
              color: mode(colors.text.light, colors.text.dark)(props),
              borderBottom: 'none',
            },
            mb: 0,
            pb: 0,
          },
        }),
      },
    },
    Menu: {
      baseStyle: (props) => ({
        list: {
          bg: mode(colors.levelTwo.light, colors.levelTwo.dark)(props),
          borderColor: mode(colors.levelTwo.light, colors.levelTwo.dark)(props),
          borderRadius: 'md',
          // boxShadow: 'lg',
          boxShadow: 'none',
        },
        item: {
          bg: 'transparent',
          _hover: {
            bg: mode(colors.levelOne.light, colors.levelOne.dark)(props),
          },
          _focus: {
            bg: mode(colors.levelOne.light, colors.levelOne.dark)(props),
          },
        },
      }),
    },
    Switch: {
      baseStyle: (props) => ({
        track: {
          _checked: {
            bg: mode(colors.switch.light, colors.switch.dark)(props),
          },
        },
      }),
      defaultProps: {
        size: 'lg',
      },
    },
  },
});

export default ssTheme;
