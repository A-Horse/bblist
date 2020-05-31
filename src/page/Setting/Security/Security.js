import React, { Component } from 'react';
import { Input } from '../../../widget/Input/Input';
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../../../redux/actions/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './security.scss';

class SettingSecurity extends Component {
  state = {};

  componentWillMount() {}

  updatePassword = (event) => {
    const oldPassword = this.refs.oldPassword.instance;
    const newPassword = this.refs.newPassword.instance;

    this.props.actions.CHANGE_PASSWORD_REQUEST({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });
  };

  render() {
    return (
      <section className="setting-security">
        <section className="setting-security-password">
          <div className="section-heading">Change Password</div>
          <div className="heading">Old password</div>
          <div>
            <Input
              type="password"
              ref="oldPassword"
              name="update-password-old"
              className="input"
            />
          </div>

          <div className="heading">New password</div>
          <div>
            <Input
              type="password"
              ref="newPassword"
              className="input"
              name="update-password-new"
            />
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
        </section>
      </section>
    );
  }
}

export const SettingSecurityContainer = withRouter(
  connect(
    (state) => {
      return {};
    },
    (dispatch) => {
      return {
        actions: bindActionCreators(makeActionRequestCollection(), dispatch),
      };
    }
  )(SettingSecurity)
);
