import React, { Component } from 'react';
import Input from 'components/widget/Input/Input';
import { Button } from 'components/widget/Button/Button';
import PropTypes from 'prop-types';

import '../../../style/page/setting/profile.scss';

export default class Profile extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  state = {
    username: ''
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  render() {
    return (
      <section className="setting-profile">
        <section className="setting-profile-username">
          <div className="heading">Username:</div>
          <div>
            <Input
              defaultValue={this.props.user.get('username')}
              type="text"
              ref={ref => (this.usernameInput = ref)}
              onChange={value => this.setState({ username: value })}
              name="profile-username"
              className="input"
            />
            <Button
              className="update-button"
              styleType="primary"
              onClick={() => {
                this.props.actions.UPDATE_USER_REQUEST({
                  username: this.state.username
                });
              }}
              size="middle"
              disable={
                !this.state.username || this.state.username === this.props.user.get('username')
              }
            >
              Update
            </Button>
          </div>
        </section>
      </section>
    );
  }
}
