import './SignUp.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LogoBan } from '../../components/LogoBan/LogoBan';
import { Input } from '../../widget/Input/Input';
import { updateTitle } from '../../services/title';
import { AppButton } from '../../widget/Button';

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
    return (
      <div className="signup-main">
        <LogoBan />
        <form className="signup-form" onSubmit={this.signup}>
          <div>
            <Input
              value={this.state.email}
              onChange={value => this.setState({ email: value })}
              type="text"
              name="octopus-email"
              required
              placeholder="Email"
            />
          </div>

          <div>
            <Input
              value={this.state.username}
              onChange={value => this.setState({ username: value })}
              type="text"
              name="octopus-username"
              required
              placeholder="Name"
            />
          </div>

          <div>
            <Input
              value={this.state.password}
              onChange={value => this.setState({ password: value })}
              type="password"
              name="octopus-password"
              required
              placeholder="Password"
            />
          </div>

          <div>
            <Input
              value={this.state.passwordConfirm}
              onChange={value => this.setState({ passwordConfirm: value })}
              type="password"
              name="octopus-confirm-password"
              required
              placeholder="Confirm Password"
            />
          </div>

          <AppButton className="signup-button" htmlType="submit">
            Sign Up
          </AppButton>
        </form>

        <div className="signin-tip">
          Already has an Account?
          <Link className="signin-link" to="/signin">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  signup(event: any) {
    event.preventDefault();

    const signUpData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    this.props.actions.SIGNUP_REQUEST(signUpData);
  }
}

export default SignUp;
