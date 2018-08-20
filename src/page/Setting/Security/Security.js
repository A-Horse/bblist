// @flow
import React, { Component } from 'react';
import Input from '../../../components/widget/Input/Input';
import { Button } from '../../../components/widget/Button/Button';
import { ErrorMsg } from '../../../components/ErrorMsg/ErrorMsg';
import { validateFormValue } from '../../../services/validate-strategy';
import R from 'ramda';

import 'style/page/setting/security.scss';

export default class Security extends Component {
  state = { updatePwderrorMessages: {} };

  componentWillMount() {}

  updatePassword = event => {
    const oldPassword = this.refs.oldPassword.instance;
    const newPassword = this.refs.newPassword.instance;
    const confirmPassword = this.refs.confirmPassword.instance;

    const data = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      confirmPassword: newPassword.value
    };
    const errorMessages = validateFormValue(data, {
      confirmPassword: [`eqTo@${data.newPassword}#password don't match`]
    });
    this.setState({ updatePwderrorMessages: errorMessages });
    if (Object.keys(errorMessages).length) {
      return;
    }
    this.props.actions.updatePassword(data);
  };

  render() {
    return (
      <section className="setting-security">
        <section className="setting-security-password">
          <div className="section-heading">Password</div>
          <div className="heading">Old password</div>
          <div>
            <Input type="password" ref="oldPassword" name="update-password-old" className="input" />
          </div>

          <div className="heading">New password</div>
          <div>
            <Input type="password" ref="newPassword" className="input" name="update-password-new" />
          </div>

          <div className="heading">Confirm new password</div>
          <div>
            <Input
              type="password"
              ref="confirmPassword"
              className="input"
              name="update-password-confirm"
            />
          </div>

          <ErrorMsg messages={R.values(this.state.updatePwderrorMessages)} />

          <Button
            className="signin-button"
            styleType="primary"
            onClick={this.updatePassword}
            size="middle"
          >
            Update Passoword
          </Button>
        </section>
      </section>
    );
  }
}
