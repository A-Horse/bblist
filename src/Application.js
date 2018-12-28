import React, { Component, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router';
import history from './services/history';
import App from './page/App.container';

import './style/normalize.css';
import './style/app.scss';

const SignInContainer = React.lazy(() => import('./page/SignIn/SignIn.container'));
const SignIn = () => {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <SignInContainer />
      </Suspense>
  );
}

const SignUpContainer = React.lazy(() => import('./page/SignUp/SignUp.container'));
const SignUp = () => {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpContainer />
      </Suspense>
  );
}

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
