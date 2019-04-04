const light = {
  mode: 'light',
  primary: '#1a57f0',
  secondary: '#f7f8fa',
  gray: '#edeef2',
  mediumGray: '#d0d6e4',
  darkGray: '#5a626f',
  background: '#ffffff',
  text: '#61646d',
  footerText: '#858B9A',
  dark: '#03060b',
  success: '#0fbf99',
  warning: '#fb7166',

  pageWidth: '1000px',
  contentWidth: '800px',
  boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.10)',
  borderRadius: '5px',
  mobileBreak: '(max-width: 650px)',
  tabletBreak: '(max-width: 910px)',
  isNotMobile: '(min-width: 651px)',
};

const dark = {
  ...light,
  mode: 'dark',
};

const properties = {
  light: {...light},
  dark: {...dark},
};

export default properties;
