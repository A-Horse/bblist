//
import React, { Component } from 'react';
import Input from '../../../components/widget/Input/Input';
import { Button } from '../../../components/widget/Button/Button';
import { ErrorMsg } from '../../../components/ErrorMsg/ErrorMsg';
import { validateFormValue } from '../../../services/validate-strategy';
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../../../actions/actions';
import * as R from 'ramda';
import { connect } from 'react-redux';
import SettingPage from 'page/Setting/SettingPage';
import { withRouter } from 'react-router-dom';

import './security.less';

class SettingSecurity extends Component {
  state = {};

  componentWillMount() {}

  updatePassword = event => {
    const oldPassword = this.refs.oldPassword.instance;
    const newPassword = this.refs.newPassword.instance;
    const confirmPassword = this.refs.confirmPassword.instance;

    const data = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value
    };
    this.props.actions.CHANGE_PASSWORD_REQUEST({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    });
  };

  render() {
    return (
      <section className="setting-security">
        <section className="setting-security-password">
          <div className="section-heading">Change Password</div>
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
            <Input type="password" ref="confirmPassword" className="input" name="update-password-confirm" />
          </div>

          <Button className="signin-button" styleType="primary" onClick={this.updatePassword} size="middle">
            Update Passoword
          </Button>
        </section>
      </section>
    );
  }
}

export const SettingSecurityContainer = withRouter(
  connect(
    state => {
      return {};
    },
    dispatch => {
      return {
        actions: bindActionCreators(makeActionRequestCollection(), dispatch)
      };
    }
  )(SettingSecurity)
);
