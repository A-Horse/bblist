import React, { Component } from 'react';
import { makeGravatarUrl, getUserGravatorFromStorge } from '../services/gravatar';

import 'style/component/useravatar.scss';

class UserAvatar extends Component {
  render() {
    const { user } = this.props;

    const storgeData = getUserGravatorFromStorge(user.id);
    if (storgeData) {
      return (
        <img
          src={`data:image/png;base64,${storgeData}`}
          className="useravatar"
          style={this.props.style}
        />
      );
    }
    return (
      <img
        ref="avator"
        src={makeGravatarUrl(user.email)}
        style={this.props.style}
        className="useravatar"
        crossOrigin="Anonymous"
      />
    );
  }
}

export default UserAvatar;
