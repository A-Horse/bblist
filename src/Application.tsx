import React, { Component, Suspense } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './services/history';

import './style/normalize.css';
import './style/app.scss';
import { AppRouter } from './page/AppRouter';

const LoginPage = React.lazy(() => import('./page/Login/LoginPage'));
const LoginPageSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
};

const SignUpContainer = React.lazy(() => import('./page/SignUp/SignUp'));
const SignUpPageSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContainer />
    </Suspense>
  );
};

export class Application extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={LoginPageSuspense} />
          <Route exact path="/signup" component={SignUpPageSuspense} />
          <Route path="/" component={AppRouter} />
        </Switch>
      </Router>
    );
  }
}
