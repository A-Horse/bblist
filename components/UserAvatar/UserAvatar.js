import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeGravatarUrl, getUserGravatorFromStorge } from '../../services/gravatar';

import './UserAvatar.scss';

class UserAvatar extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

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
