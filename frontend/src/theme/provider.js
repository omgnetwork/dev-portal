import React, { useState } from 'react';
import colors from './colors';

export const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [ theme, setTheme ] = useState(colors.light);

  const toggleTheme = () => {
    theme === colors.light
      ? setTheme(colors.dark)
      : setTheme(colors.light);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      { children }
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
