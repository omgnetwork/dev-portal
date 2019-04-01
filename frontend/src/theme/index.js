import React from 'react';
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';

import ThemeProvider, { ThemeContext } from './provider';

const XGlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const Theme = ({ children }) => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <StyledThemeProvider theme={theme}>
            <>
              { children }
              <XGlobalStyle />
            </>
          </StyledThemeProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

export default Theme;
