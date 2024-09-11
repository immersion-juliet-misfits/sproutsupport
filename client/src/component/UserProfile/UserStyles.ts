import { mode } from '@chakra-ui/theme-tools';
import colors from '../colors';

const UserStyles = (props) => ({

  '.pub-bio': {
    border: '1px solid',
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
    borderRadius: '10px',
    width: '60%',
    mx: 'auto',
    p: '10px',
  },

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
    // borderColor: 'red',
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
    paddingBottom: '20px',
    marginTop: '20px',
    marginBottom: '10px',
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
    // border: '2px solid purple',
    size: 'md',
    alignSelf: 'center',
  },

  '.u-checkIcon': {
    // border: '2px solid orange',
    alignSelf: 'center',
  },

  '.u-divider': {
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
  },

  '.u-gi-changes': {
    border: '1px solid',
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
    borderRadius: 'lg',
    boxShadow: 'md',
    width: '100%',
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pt: '10px',
  },

  '.u-heading': {
    color: mode(colors.text.light, colors.text.dark)(props),
    textAlign: 'center',
    alignItems: 'center',
  },
  '.u-heading3': {
    color: mode(colors.text.light, colors.text.dark)(props),
    fontSize: '3xl',
    textAlign: 'center',
    alignItems: 'center',
    margin: '10px',
  },
  '.u-heading5': {
    color: mode(colors.text.light, colors.text.dark)(props),
    fontSize: '5xl',
    textAlign: 'center',
    alignItems: 'center',
    margin: '10px',
  },

  '.u-hstack': {
    // border:'1px solid red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    mt: '15px',
    pt: '10px',
    mx: 'auto',
  },

  '.u-hs-input': {
    // border: '1px solid purple',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    pb: '5px',
  },

  //  Nothing added to the below settings appears to affect the input
  '.u-input': {
    // border: '10px solid orange', // This doesn't even appear
    // my: '0px'
  },

  '.u-link': {
    fontSize: '3xl',
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
    py: '5',
  },

  // '.u-tabs': {},

  '.u-text': {
    color: mode(colors.text.light, colors.text.dark)(props),
    // fontSize: 'xl',
    fontWeight: 'bold',
    alignItems: 'center',
  },

  '.u-edit-vstack': {
    // border: '1px solid blue',
    width: '50%',
  },

  // I need the contents of this aligned along the horizontal access
  // This contains both input boxes
  '.u-vs-input': {
    // border: '1px solid blue',
    width: '75%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '.u-vstack': {
    borderRadius: '10px',
    width: '60%',
    mx: 'auto',
    my: '10px',
  },
});

export default UserStyles;
