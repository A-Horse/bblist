import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { PageContainer } from '../../components/widget/PageContainer';
import { makeGravatarUrl } from '../../services/gravatar';
import Input from 'components/widget/Input';

import 'style/page/setting/profile.scss';

export default class Profile extends Component {


  componentWillMount() {
    this.state = {username: this.props.user.username};
  }

  render() {
    return (
      <section className='setting-profile'>

        <section className='setting-profile-username'>
          <div className="heading">Username:</div>
          <div>
            <Input value={this.state.username} type="text" ref="username" name="profile-username" className='input'/>
          </div>

        </section>

      </section>
    );
  }
}
