import { mode } from '@chakra-ui/theme-tools';
import colors from '../colors';

const UserStyles = (props) => ({

  '.pub-box': {
    border: '1px solid',
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
    borderRadius: '10px',
    minHeight: '300px',
    width: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', // Needed to align Heading
    gap: '20px',
    my: '5px',
  },

  '.pub-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '#pub-imgBox': {
    width: '300px',
    height: '300px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '#pub-img': {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },

  '#u-avatar-gi': {
    border: '15px solid',
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
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

  '#u-avatar-img': {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    objectFit: 'cover',
  },

  '.u-box-todaysWeather': {
    border: '1px solid',
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
    boxShadow: 'md',
    borderRadius: 'lg',
    padding: '20px',
    marginBottom: '16px',
    textAlign: 'center',
    maxWidth: '90%',
    mx: 'auto',
  },

  '.u-box-weeksWeather': {
    border: '1px solid',
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
    boxShadow: 'md',
    borderRadius: 'lg',
    padding: '20px',
    marginBottom: '10px',
    textAlign: 'center',
  },

  '.u-check-button': {
    width: '25px',
    mx: '10px',
    mt: '20px',
    mb: '0px',
    pb: '0px',
  },

  '.u-checkIcon': {
    alignSelf: 'center',
  },

  '.u-divider': {
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
  },

  '.u-heading': {
    color: mode(colors.text.light, colors.text.dark)(props),
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    margin: '10px',
  },

  '.u-hs-input': {
    width: '100%',
    mb: '0px',
    pb: '0px',
  },

  '.u-gi-changes': {
    border: '1px solid',
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
    borderRadius: 'lg',
    boxShadow: 'md',
    width: '75%',
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pt: '10px',
  },

  //  Nothing added to the below settings appears to affect the input
  '.u-input': {
    // border: '10px solid blue', // This doesn't even appear
  },

  '.u-lvl-one': {
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
  },

  '.u-pages': {
    border: '1px solid',
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
    borderRadius: 'lg',
    boxShadow: 'md',
    mt: '0',
    gap: '10px',
    overflow: 'hidden',
    templateRows: '1fr',
    templateColumns: '1fr',
    alignItems: 'center',
    justifyItems: 'center',
    py: '4',
  },

  // '.u-tabs': {},

  '.u-text': {
    color: mode(colors.text.light, colors.text.dark)(props),
    fontSize: 'xl',
    fontWeight: 'bold',
    alignItems: 'center',
  },

  '.u-vs-input': {
    width: '75%',
  },
});

export default UserStyles;
