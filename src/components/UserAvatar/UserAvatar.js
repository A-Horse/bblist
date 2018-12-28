//
import React, { Component } from 'react';
import { makeGravatarUrl, getUserGravatorFromStorge } from '../../services/gravatar';

import './UserAvatar.scss';

export class UserAvatar extends Component {
  render() {
    const { user } = this.props;

    // TODO 把 avatrar 通过后台代理吧
    const storgeData = getUserGravatorFromStorge(user.id);
    if (storgeData) {
      return <img src={`data:image/png;base64,${storgeData}`} className="useravatar" />;
    }
    return <img src={makeGravatarUrl(user.email)} className="useravatar" crossOrigin="Anonymous" />;
  }
}
