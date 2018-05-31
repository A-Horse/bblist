// @flow
import React, { Component } from 'react';
import { makeGravatarUrl, getUserGravatorFromStorge } from '../../services/gravatar';

import './UserAvatar.less';

class UserAvatar extends Component<{
  user: any
}> {
  render() {
    const { user } = this.props;

    const storgeData = getUserGravatorFromStorge(user.id);
    // TODO 把 avatrar 通过后台代理吧
    if (storgeData) {
      return <img src={`data:image/png;base64,${storgeData}`} className="useravatar" />;
    }
    return <img src={makeGravatarUrl(user.email)} className="useravatar" crossOrigin="Anonymous" />;
  }
}

export default UserAvatar;
