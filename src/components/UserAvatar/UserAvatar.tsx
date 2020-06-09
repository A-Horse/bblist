import React, { Component, CSSProperties } from 'react';
import { makeGravatarUrl } from '../../utils/gravatar';
import { DisplayAccount } from '../../typings/user.typing';

import './UserAvatar.scss';

interface InputProps {
  user?: DisplayAccount;
  style?: CSSProperties;
}

export class UserAvatar extends Component<InputProps> {
  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return (
      <img
        alt="user-avatar"
        src={makeGravatarUrl(user.email)}
        style={{
          width: 30,
          height: 30,
          borderRadius: 3,
          ...this.props.style,
        }}
      />
    );
  }
}
