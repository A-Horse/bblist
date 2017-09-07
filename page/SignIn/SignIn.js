import React, { Component } from 'react';

import { validateFormValue } from 'services/validate-strategy';
import { Button } from 'components/widget/Button/Button';
import { Input } from 'components/widget/Input';
import { LogoBan } from 'components/commons/LogoBan';
import { ErrorMsg } from 'components/ErrorMsg';
import { PageContainer } from '../../components/widget/PageContainer';
import { Link } from 'react-router-dom';
import { updateTitle } from 'services/title';
import { Redirect } from 'react-router';

import R from 'ramda';

import 'style/page/signin.scss';

// TODO 登出 ，登陆成功后清空缓存
class SignIn extends Component {
  componentWillMount() {
    this.state = { errorMessages: {} };
  }

  componentDidMount() {
    updateTitle('Sign In');
  }

  componentWillReceiveProps(newProps) {
    if (newProps.signInAuthenticated) {
      this.props.actions.LOGIN_FINISH_FN();
      this.props.history.push('/home');
    }
  }

  render() {
    // TODO experience button event.preventDefault 会阻止 html5 的校验

    return (
      <PageContainer className="signin-page">
        <div className="signin-main">
          <LogoBan />
          <form className="signin-form" onSubmit={this.login.bind(this)}>
            <div>
              <Input type="text" ref="email" name="bblist-email" required placeholder="Email" />
            </div>

            <div>
              <Input
                type="password"
                ref="password"
                name="bblist-password"
                required
                placeholder="Password"
              />
            </div>

            <ErrorMsg messages={R.values(this.state.errorMessages)} />
            <ErrorMsg
              messages={this.props.signInErrorMessages ? [this.props.signInErrorMessages] : []}
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

  login(event) {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    const loginInfo = {
      email: email.instance.value.trim(),
      password: password.instance.value.trim()
    };

    const errorMessages = validateFormValue(loginInfo, {
      email: ['email'],
      password: ['max@100#Password Up to 100 characters', 'min@6#min 6']
    });

    this.setState({ errorMessages: errorMessages });
    if (Object.keys(errorMessages).length) {
      return;
    }
    this.props.actions.LOGIN_FN(loginInfo);
  }
}

export default SignIn;
