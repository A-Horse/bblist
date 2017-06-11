import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { PageContainer } from '../../components/widget/PageContainer';
import { makeGravatarUrl } from '../../services/gravatar';
import { ActiveCalendar } from './ActiveCalendar';

import 'style/page/profile/profile.scss';

export default class Profile extends Component {
  componentWillMount() {

  }



  render() {
    const { user } = this.props;
    return (
      <div className='profile-page'>

        <div className='profile-infomation'>
          <div>{user.email}</div>
          <div>{user.name}</div>
          <img ref='avator' className='profile-avatar' crossOrigin='Anonymous'
            src={makeGravatarUrl(user.email, 200)}/>
          <p>
            We use <a target="_blank" href="https://www.gravatar.com/">Gravatar</a> to display you avatar.
            you can change avatar in gravatar by your email;
          </p>
        </div>

        <div className='profile-detail'>
          <div>Join Octous ready <span className="profile-detail-number">N</span> days.</div>

          <div>Own <span className="profile-detail-number">N</span> Task board.</div>
          <div>Finished <span className="profile-detail-number">N</span> Todos.</div>

          <ActiveCalendar />

        </div>



      </div>
    );
  }
}
