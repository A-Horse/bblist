import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {PageContainer} from '../../components/widget/PageContainer';
import {makeGravatarUrl} from '../../services/gravatar';

import 'style/page/profile/profile.scss';

export default class Profile extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div className='profile-page'>

        <div className='profile-infomation'>

        </div>

        <div className='profile-works'>

        </div>



      </div>
    );
  }
}
