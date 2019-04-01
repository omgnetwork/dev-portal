import React from 'react';

import { ThemeContext } from 'theme/provider';

const SwitchTheme = () => {
  return (
    <ThemeContext.Consumer>
      {({ toggleTheme }) => {
        return (
          <div onClick={toggleTheme}>
            ToggleTheme!!
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}

export default SwitchTheme;
