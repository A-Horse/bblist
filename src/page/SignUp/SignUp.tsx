import React, { Component } from 'react';
import { validateFormValue } from '../../services/validate-strategy';
import { PageContainer } from '../../components/widget/PageContainer';
import { Input } from '../../components/widget/Input/Input';
import { updateTitle } from '../../services/title';
import { Button } from '../../components/widget/Button/Button';
import { LogoBan } from '../../components/commons/LogoBan/LogoBan';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';
import { Link } from 'react-router-dom';
import * as R from 'ramda';

import './SignUp.scss';

class SignUp extends Component<any, any> {
  state = {
    errorMessage: {},
    username: '',
    password: '',
    passwordConfirm: '',
    email: ''
  };

  constructor(props: any) {
    super(props);
    this.signup = this.signup.bind(this);
  }

  componentWillMount(): void {
    updateTitle('Sign Up');
  }

  componentWillReceiveProps(newProps: any) {
    if (newProps.signUpSuccess) {
      this.props.actions.SIGNUP_FINISH();
      this.props.history.push('/signin');
    }
  }

  render() {
    const errorMessages = this.state.errorMessage;

    return (
      <PageContainer className="signup-page">
        <div className="signup-main">
          <LogoBan />
          <form className="signup-form" onSubmit={this.signup}>
            <div>
              <Input
                value={this.state.email}
                onChange={value => this.setState({email: value})}
                type="text"
                name="octopus-email"
                required
                placeholder="Email"
              />
            </div>

            <div>
              <Input
                value={this.state.username}
                onChange={value => this.setState({username: value})}
                type="text"
                name="octopus-username"
                required
                placeholder="Name"
              />
            </div>

            <div>
              <Input
                value={this.state.password}
                onChange={value => this.setState({password: value})}
                type="password"
                name="octopus-password"
                required
                placeholder="Password"
              />
            </div>

            <div>
              <Input
                value={this.state.passwordConfirm}
                onChange={value => this.setState({passwordConfirm: value})}
                type="password"
                name="octopus-confirm-password"
                required
                placeholder="Confirm Password"
              />
            </div>

            <ErrorMsg messages={R.values(errorMessages)} />

            <Button className="signup-button" type="submit" styleType="primary" size="large">
              Sign Up
            </Button>
          </form>

          <div className="signin-tip">
            Already has an Account?
            <Link className="signin-link" to="/signin">
              Sign In
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  signup(event: any) {
    event.preventDefault();

    const signUpData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password  
    };

    const errorMessages = validateFormValue(signUpData, {
      name: [
        'max@100#Name Up to 100 characters ',
        'min@3#The name must be a minimum of three characters'
      ],
      password: ['max@100#Password Up to 100 characters', 'min@6#password min 6'],
      confirmPassword: [`eqTo@${signUpData.password}#password don't match`],
      email: ['email#email express wrong', 'max@150#max 150']
    });

    this.setState({ errorMessages: errorMessages });

    
    this.props.actions.SIGNUP_REQUEST(signUpData);
  }
}

export default SignUp;