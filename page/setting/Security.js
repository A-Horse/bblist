import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { PageContainer } from 'components/widget/PageContainer';
import { makeGravatarUrl } from 'services/gravatar';
import Loading from 'components/widget/loading';
import Input from 'components/widget/Input';
import {Button} from 'components/widget/Button';

import 'style/page/setting/security.scss';

export default class Security extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <section className='setting-security'>

        <section className='setting-security-password'>
          <div className="section-heading">Password</div>
          <div className="heading">Old password</div>
          <div>
            <Input className='input'/>
          </div>

          <div className="heading">New password</div>
          <div>
            <Input className='input'/>
          </div>

          <div className="heading">Confirm new password</div>
          <div>
            <Input className='input'/>
          </div>

          <Button className='signin-button'
            styleType='primary'
            size='middle' onClick={() => {browserHistory.push('/signin')}}>
            Sign In
          </Button>
        </section>

      </section>
    );
  }
}
