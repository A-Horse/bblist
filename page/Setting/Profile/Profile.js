import React, { Component } from 'react';
import Input from 'components/widget/Input/Input';
import { Button } from 'components/widget/Button/Button';

import 'style/page/setting/profile.scss';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.updateUsername = this.updateUsername.bind(this);
  }

  componentWillMount() {}

  updateUsername(event) {
    const username = this.refs.username;
    this.props.actions.updateUserInfo(this.props.user.get('id'), {
      username: username.value.trim()
    });
  }

  render() {
    return (
      <section className="setting-profile">
        <section className="setting-profile-username">
          <div className="heading">Username:</div>
          <div>
            <Input
              defaultValue={this.props.user.get('username')}
              type="text"
              ref="username"
              name="profile-username"
              className="input"
            />
            <Button
              className="update-button"
              styleType="primary"
              onClick={this.updateUsername}
              size="middle"
            >
              Update
            </Button>
          </div>
        </section>
      </section>
    );
  }
}
