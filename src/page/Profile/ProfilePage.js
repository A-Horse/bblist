import React, { Component } from 'react';
import { makeGravatarUrl } from '../../services/gravatar';

import './ProfilePage.scss';

export class Profile extends Component {
  componentWillMount() {}

  render() {
    const { user } = this.props;
    return (
      <div className="profile-page">
        <div className="profile-infomation">
          <div>{user.get('email')}</div>
          <div>{user.get('username')}</div>
          <img
            alt=""
            className="profile-avatar"
            crossOrigin="Anonymous"
            src={makeGravatarUrl(user.get('email'), 200)}
          />
          <p>
            We use{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.gravatar.com/"
            >
              Gravatar
            </a>{' '}
            to display you avatar. you can change avatar in gravatar by your
            email;
          </p>
        </div>
      </div>
    );
  }
}

export default Profile;
