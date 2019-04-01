import React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

import LandingPage from 'pages/landing-page/LandingPage';

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
