import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Router, Route, Switch /* Redirect*/ } from 'react-router';
import history from './services/history';
import Bundle from 'components/Bundle';
import App from 'page/App.container';

import 'style/normalize.css';
import 'style/app.scss';

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

console.log(ConnectedRouter);

export class Application extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/" component={App} />
        </Switch>
      </Router>
    );
  }
}