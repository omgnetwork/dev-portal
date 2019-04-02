import React from 'react';
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';

import ThemeProvider, { ThemeContext } from './provider';

const XGlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    font-size: 16px;

    @import url('https://cdn.omise.co/fonts/circular.css?family=Circular');
    font-family: 'Circular', sans-serif;
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
