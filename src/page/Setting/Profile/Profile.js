import React, { Component } from 'react';
import { Input } from '../../../widget/Input/Input';
import PropTypes from 'prop-types';

export default class Profile extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  state = {
    username: ''
  };
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
          </div>
        </section>
      </section>
    );
  }
}
