import React, { Component } from 'react';

export class Profile extends Component {
  componentWillMount() {}

  render() {
    const { user } = this.props;
    return (
      <div className="profile-page">
        <div className="profile-infomation">
          <div>{user.get('email')}</div>
          <div>{user.get('username')}</div>

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
