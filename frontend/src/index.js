import React from 'react';
import ReactDOM from 'react-dom';

import Router from './router';
import Theme from './theme';

const App = () => {
  return (
    <Theme>
      <Router />
    </Theme>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
