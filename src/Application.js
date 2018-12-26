import React, { Component } from "react";
import { Router, Route, Switch /* Redirect*/ } from "react-router";
import history from "./services/history";
import App from "page/App.container";

import "style/normalize.css";
import "style/app.scss";

const SignIn = React.lazy(() => import('./page/SignIn/SignIn.container'));
// const SignIn = props => (
//   <Bundle
//     load={require("bundle-loader?lazy&name=signin-page!./page/SignIn/SignIn.container")}
//   >
//     {B => <B {...props} />}
//   </Bundle>
// );

const SignUp = React.lazy(() => import('./page/SignUp/SignUp.container'));
// const SignUp = props => (
//   <Bundle
//     load={require("bundle-loader?lazy&name=signup-page!./page/SignUp/SignUp.container")}
//   >
//     {B => <B {...props} />}
//   </Bundle>
// );

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
