import React, { Component } from 'react';
import { makeGravatarUrl, getUserGravatorFromStorge } from '../../services/gravatar';
import { UserShow } from '../../typings/user/user.typing';

import './UserAvatar.scss';

interface InputProps {
  user?: UserShow;
}

export class UserAvatar extends Component<InputProps> {
  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    const storgeData = getUserGravatorFromStorge(user.id);
    if (storgeData) {
      return <img src={`data:image/png;base64,${storgeData}`} className="useravatar" />;
    }
    return <img src={makeGravatarUrl(user.email)} className="useravatar" crossOrigin="anonymous" />;
  }
}
