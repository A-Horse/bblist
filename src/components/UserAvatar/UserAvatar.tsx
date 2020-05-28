import React, { Component, CSSProperties } from 'react';
import { makeGravatarUrl } from '../../services/gravatar';
import { AppUserInfo } from '../../typings/user/user.typing';

import './UserAvatar.scss';

interface InputProps {
  user?: AppUserInfo;
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
