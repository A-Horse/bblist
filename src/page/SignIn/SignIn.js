//
import React, { Component } from 'react';
import { validateFormValue } from '../../services/validate-strategy';
import { Button } from '../../components/widget/Button/Button';
import { Input } from '../../components/widget/Input/Input';
import { LogoBan } from '../../components/commons/LogoBan/LogoBan';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';
import { PageContainer } from '../../components/widget/PageContainer';
import { Link } from 'react-router-dom';
import { updateTitle } from '../../services/title';

import * as R from 'ramda';

import './SignIn.scss';

class SignIn extends Component {
  state = {
    errorMessages: {},
    email: '',
    password: ''
  };

  componentDidMount() {
    updateTitle('Sign In');
  }

  componentWillReceiveProps(newProps) {
    if (newProps.signInAuthenticated) {
      this.props.actions.LOGIN_FINISH();
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <PageContainer className="signin-page">
        <div className="signin-main">
          <LogoBan />
          <form className="signin-form" onSubmit={this.login}>
            <div>
              <Input
                type="text"
                name="octopus-email"
                required
                placeholder="Email"
                onChange={value => this.setState({ email: value })}
              />
            </div>

            <div>
              <Input
                type="password"
                name="octopus-password"
                onChange={value => this.setState({ password: value })}
                required
                placeholder="Password"
              />
            </div>

            <ErrorMsg
              messages={R.compose(
                R.concat([this.props.signInErrorMessages]),
                R.values
              )(this.state.errorMessages)}
            />
            <Button className="signin-button" size="large" type="submit" styleType="primary">
              Login
            </Button>
          </form>

          <div className="signup-tip">
            Do not have an account yet?
            <Link className="signup-link" to="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  login = event => {
    event.preventDefault();
    const loginInfo = {
      email: this.state.email.trim(),
      password: this.state.password.trim()
    };

    const errorMessages = validateFormValue(loginInfo, {
      email: ['email'],
      password: ['max@100#Password Up to 100 characters', 'min@6#min 6']
    });

    this.setState({ errorMessages: errorMessages });
    if (Object.keys(errorMessages).length) {
      return;
    }
    this.props.actions.LOGIN_REQUEST(loginInfo);
  };
}

export default SignIn;
