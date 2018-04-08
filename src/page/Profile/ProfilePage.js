import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeGravatarUrl } from 'services/gravatar';
import { ActiveCalendar } from './ActiveCalendar/ActiveCalendar';

import './ProfilePage.scss';

export class Profile extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  componentWillMount() {}

  render() {
    const { user } = this.props;
    return (
      <div className="profile-page">
        <div className="profile-infomation">
          <div>{user.get('email')}</div>
          <div>{user.get('username')}</div>
          <img
            className="profile-avatar"
            crossOrigin="Anonymous"
            src={makeGravatarUrl(user.get('email'), 200)}
          />
          <p>
            We use{' '}
            <a rel="noopener noreferrer" target="_blank" href="https://www.gravatar.com/">
              Gravatar
            </a>{' '}
            to display you avatar. you can change avatar in gravatar by your email;
          </p>
        </div>

        <div className="profile-detail">
          <div>
            Join Octopus ready <span className="profile-detail-number">N</span> days.
          </div>

          <div>
            Own <span className="profile-detail-number">N</span> Task board.
          </div>
          <div>
            Finished <span className="profile-detail-number">N</span> Todos.
          </div>

          <ActiveCalendar />
        </div>
      </div>
    );
  }
}

export default Profile;
