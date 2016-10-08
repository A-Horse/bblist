import React, {Component} from 'react';
import {makeGravatarUrl, getUserGravatorFromStorge, saveUserGravatorToStorge} from '../services/gravatar';
import {getImageBase64} from '../services/image';

import 'style/component/useravatar.scss';

class UserAvatar extends Component {
  onLoadToSaveAvator() {
    const {userId} = this.props.user;
    const base64 = getImageBase64(this.refs.avator);
    saveUserGravatorToStorge(userId, base64);
  }
  
  render() {
    const {user} = this.props;
    const storgeData = getUserGravatorFromStorge(user.id);
    if (storgeData) {
      return <img src={`data:image/png;base64,${storgeData}`}
              className='useravatar'
              style={this.props.style}/>;
    }
    return <img ref='avator' src={makeGravatarUrl(user.email)}
            style={this.props.style}
            className='useravatar'
            onLoad={() => {this.onLoadToSaveAvator()}}
            crossOrigin='Anonymous'/>;
  }
}

export default UserAvatar;
