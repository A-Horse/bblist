import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { PageContainer } from '../../components/widget/PageContainer';
import { makeGravatarUrl } from '../../services/gravatar';
import Input from 'components/widget/Input';
import { Button } from 'components/widget/Button';

import 'style/page/setting/profile.scss';

export default class Profile extends Component {

  componentWillMount() {
    this.state = {username: this.props.user.username};
  }

  updateUsername() {

  }

  render() {
    return (
      <section className='setting-profile'>

        <section className='setting-profile-username'>
          <div className="heading">Username:</div>
          <div>
            <Input value={this.state.username} type="text" ref="username" name="profile-username" className='input'/>
            <Button className='update-button'
              styleType='primary'
              onClick={::this.updateUsername}
              size='middle'>
              Update
            </Button>
          </div>

        </section>

      </section>
    );
  }
}
