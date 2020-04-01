import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './services/history';
import App from './page/App.container';

import './style/normalize.css';
import './style/app.scss';

const LoginPage = React.lazy(() => import('./page/Login/LoginPage'));
const LoginPageSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
};

const SignUpContainer = React.lazy(() =>
  import('./page/SignUp/SignUp.container')
);
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
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPageSuspense} />
          <Route exact path="/signup" component={SignUpPageSuspense} />
          <Route path="/" component={App} />
        </Switch>
      </Router>
    );
  }
}
