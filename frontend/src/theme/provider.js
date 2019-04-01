import React, { useState } from 'react';
import properties from './properties';

export const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [ theme, setTheme ] = useState(properties.light);

  const toggleTheme = () => {
    theme === properties.light
      ? setTheme(properties.dark)
      : setTheme(properties.light);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      { children }
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
