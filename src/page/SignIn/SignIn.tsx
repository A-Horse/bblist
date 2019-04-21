import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { updateTitle } from '../../services/title';
import { WrappedSignInForm } from './SignInForm';
import { Logo } from '../../components/commons/Logo/Logo';

import { TextLogo } from '../../components/commons/TextLogo';

import './SignIn.scss';

interface Props {
  actions: any;
  history: any;
  signInErrorMessages: any;
}

class SignIn extends Component<Props> {
  state = {
    errorMessages: {},
    email: '',
    password: ''
  };

  componentDidMount() {
    updateTitle('Sign In');
  }

  componentWillReceiveProps(newProps: any) {
    if (newProps.signInAuthenticated) {
      this.props.actions.LOGIN_FINISH();
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <div className="signin-page">
        <div className="signin-main">
          <div className="signin-main--logo-container">
            <Logo
              style={{
                width: 45
              }}
            />

            <TextLogo />
          </div>

          <WrappedSignInForm onSubmit={this.login} />

          <div className="signup-tip">
            Do not have an account yet?
            <Link className="signup-link" to="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  login = (signInData: any) => {
    this.props.actions.LOGIN_REQUEST(signInData);
  };
}

export default SignIn;
