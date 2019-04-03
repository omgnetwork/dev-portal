import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import ThemeProvider, { ThemeContext } from './provider';

const Theme = ({ children }) => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <StyledThemeProvider theme={theme}>
            <>
              { children }
            </>
          </StyledThemeProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

export default Theme;
