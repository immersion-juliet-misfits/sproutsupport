import { mode } from '@chakra-ui/theme-tools';
import colors from '../colors';
import '@fontsource/nerko-one';
import '@fontsource/pangolin';
import { RiFontSize } from 'react-icons/ri';

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
    alignItems: 'center',
    gap: '20px',
    my: '5px',
    fontFamily: 'pangolin',
  },

  '.pub-top-box': {
    width: '1100px',
    mx: 'auto',
    display: 'flex',
    paddingBottom: '15px',
  },

  '.pub-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'pangolin',
  },

  '.pub-cardHeader': {
    textAlign: 'center',
    paddingBottom: '0px !important',
  },

  '.pub-header': {
    color: mode(colors.text.light, colors.text.dark)(props),
    fontFamily: 'pangolin !important',
    fontSize: '2xl !important',
    paddingBottom: '0px',
    marginBottom: '0px',
  },

  '.pub-top-hstack': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',

    width: '100%',

    mx: 'auto',
  },

  '#pub-imgBox': {
    width: '300px',
    height: '300px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '0px',
    marginTop: '0px',
    marginBottom: '10px',
  },

  '#pub-img': {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },

  '#u-avatar-gi': {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    justifySelf: 'center',
    alignSelf: 'center',
    borderRadius: '40px',
    width: '300px',
    height: '300px',
    position: 'relative',
    overflow: 'hidden',
  },

  '#u-avatar-gi-default': {
    filter: mode(
      'invert(19%) sepia(27%) saturate(524%) hue-rotate(78deg) brightness(97%) contrast(88%)',  // Light mode filter
      'invert(76%) sepia(16%) saturate(797%) hue-rotate(60deg) brightness(95%) contrast(85%)'   // Dark mode filter
    )(props),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    justifySelf: 'center',
    alignSelf: 'center',
    borderRadius: '40px',
    width: '300px',
    height: '300px',
    position: 'relative',
    overflow: 'hidden',
  },

  '#u-avatar-img': {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    objectFit: 'cover',
  },

  '.u-box-weatherSet': {
    border: '1px solid',
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
    boxShadow: 'md',
    borderRadius: 'lg',
    paddingBottom: '20px',
    marginTop: '20px',
    marginBottom: '10px',
    textAlign: 'center',
    maxWidth: '90%',
    minWidth: '35%',
    mx: 'auto',
  },

  '.u-box-todaysWeather': {
    border: '1px solid',
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
    boxShadow: 'md',
    borderRadius: 'lg',
    padding: '20px',
    marginTop: '20px',
    marginBottom: '10px',
    textAlign: 'center',
    width: '100% !important',
    mx: 'auto',
    height: '150% !important',
  },

  '.u-box-weeksWeather': {
    border: '1px solid',
    borderColor: mode(colors.levelThree.light, colors.levelThree.dark)(props),
    boxShadow: 'md',
    borderRadius: 'lg',
    padding: '5px',
    marginBottom: '10px',
    textAlign: 'center',
  },

  '.u-check-button': {
    size: 'md',
    alignSelf: 'center',
  },

  '.u-checkIcon': {
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
    color: mode(colors.textTwo.light, colors.textTwo.dark)(props),
    textAlign: 'center',
    alignItems: 'center',
  },
  '.u-heading3': {
    color: mode(colors.textTwo.light, colors.textTwo.dark)(props),
    fontSize: '3xl',
    textAlign: 'center',
    alignItems: 'center',
    margin: '10px',
  },
  '.u-heading5': {
    color: mode(colors.textTwo.light, colors.textTwo.dark)(props),
    fontSize: '5xl',
    textAlign: 'center',
    alignItems: 'center',
    margin: '10px',
  },

  '.u-hstack': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    mt: '15px',
    pt: '10px',
    mx: 'auto',
    color: mode(colors.textTwo.light, colors.textTwo.dark)(props),
    fontFamily: 'pangolin !important',
  },

  '.u-search-hstack': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    height: '75px',
  },

  '.u-top-hstack': {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    mt: '15px',
    pt: '10px',
    mx: 'auto',
  },

  '.u-hs-input': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    pb: '5px',
  },

  '.u-input': {
    height: '50px',
    width: '300px !important',
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

  '.u-tabs': {
    fontFamily: 'pangolin',
  },

  '.u-text': {
    color: mode(colors.text.light, colors.text.dark)(props),
    fontSize: 'xl',
    alignItems: 'center',
    fontFamily: 'pangolin',
  },

  '.u-text-alert': {
    color: mode(colors.alert.light, colors.alert.dark)(props),
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: 'pangolin',
  },
  '.p-text': {
    color: mode(colors.text.dark, colors.text.light)(props),
    fontSize: 'xl',
    fontWeight: 'bold',
    alignItems: 'center',
  },

  '.u-edit-vstack': {
    width: '50%',
  },

  '.u-vs-input': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '.u-vstack': {
    width: '70%',
    mx: 'auto',
    my: '10px',
  },
});

export default UserStyles;
