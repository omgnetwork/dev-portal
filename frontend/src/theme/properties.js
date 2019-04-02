const light = {
  mode: 'light',
  primary: '#1a57f0',
  secondary: '#f7f8fa',
  gray: '#edeef2',
  background: '#ffffff',
  text: '#61646d',
  dark: '#03060b',
  success: '#0fbf99',
  warning: '#fb7166',

  pageWidth: '1000px',
  contentWidth: '800px',
  boxShadow: '0px 3px 10px 0px rgba(0,0,0,0.10)',
  borderRadius: '5px',
  mobileBreak: '(max-width: 600px)',
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
