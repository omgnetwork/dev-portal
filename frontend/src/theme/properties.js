const light = {
  MODE: 'light',
  BLUE: '#1a57f0',
  BLACK: '#03060b',
  GRAY: '#f7f8fa',
  GREEN: '#0fbf99',
  ORANGE: '#fb7166',
  WHITE: '#ffffff',
  PAGE_WIDTH: '800px',
  BOX_SHADOW: '0px 3px 10px 0px rgba(0,0,0,0.15)',
  BORDER_RADIUS: '5px',
};

const dark = {
  ...light,
  MODE: 'dark',
};

const properties = {
  light: {...light},
  dark: {...dark},
};

export default properties;
