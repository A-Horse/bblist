import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch /* Redirect*/ } from 'react-router';
import history from './services/history';

import Bundle from 'components/Bundle';
import App from 'page/App.container';

const SignIn = props => (
  <Bundle load={require('bundle-loader?lazy&name=signin-page!./page/SignIn/SignIn.container')}>
    {B => <B {...props} />}
  </Bundle>
);

const SignUp = props => (
  <Bundle load={require('bundle-loader?lazy&name=signup-page!./page/SignUp/SignUp.container')}>
    {B => <B {...props} />}
  </Bundle>
);

import 'style/normalize.css';
import 'style/app.scss';

export const Application = () => (
  <ConnectedRouter history={history}>
    {/* <Route exact path="" component={IndexPage} /> */}
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route path="/" component={App} />
    </Switch>
  </ConnectedRouter>
);

export default Application;
