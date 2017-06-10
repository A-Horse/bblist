import React, {Component} from 'react';

import {validateFormValue} from '../services/validate-strategy';
import { browserHistory } from 'react-router';
import {PageContainer} from 'components/widget/PageContainer';
import {Input} from '../components/widget/Input';
import {updateTitle} from 'services/title';
import {Button} from '../components/widget/Button';
import {LogoBan} from 'components/commons/LogoBan';
import {ErrorMsg} from 'components/ErrorMsg';
import {Link} from 'react-router';
import R from 'ramda';

import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../actions/sign-up';

import 'style/page/signup.scss';

class SignUp extends Component {
  componentDidMount() {
    updateTitle('Sign Up');
  }

  componentWillMount() {
    this.state = {
      errorMessage: {}
    };
  }

  render() {
    const errorMessages = this.state.errorMessages;

    return (
      <PageContainer className='signup-page'>
        <div className='signup-main'>
          <LogoBan/>
          <form ref='form' className='signup-form' onSubmit={this.signup.bind(this)}>
            <div>
              <Input type='text' ref='email' name='bblist-email' required placeholder="Email"/>
            </div>

            <div>
              <Input type='text' ref='name' name='bblist-name' required placeholder="Name"/>
            </div>

            <div>
              <Input type='password' ref='password' name='bblist-password' required placeholder="Password"/>
            </div>

            <div>
              <Input type='password' ref='repeat' name='bblist-repeat' required placeholder="Password Repeat"/>
            </div>

            <ErrorMsg messages={R.values(errorMessages)}/>

            <Button className='signup-button' type='submit' styleType='primary' size='large'>Sign Up</Button>
          </form>

          <div className='signin-tip'>
            Already has an Account?
            <Link className='signin-link' to="/signin">Sign In</Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  getSignUpData() {
    const name = this.refs.name.instance;
    const password = this.refs.password.instance;
    const repeat = this.refs.repeat.instance;
    const email = this.refs.email.instance;

    return {
      name: name.value.trim(),
      password: password.value.trim(),
      email: email.value.trim(),
      repeat: repeat.value.trim()
    };
  }

  validateSignUpData(signUpData) {
    return validateFormValue(signUpData, {
      name: ['max@100#Name Up to 100 characters ', 'min@3#The name must be a minimum of three characters'],
      password: ['max@100#Password Up to 100 characters', 'min@6#min 6'],
      repeat: [`eqTo@${signUpData.password}#password don't match`],
      email: ['email#email express wrong', 'max@150#max 150']
    });

  }

  signup(event) {
    event.preventDefault();

    const signUpData = this.getSignUpData();
    const errorMessages = this.validateSignUpData(signUpData);
    this.setState({errorMessages: errorMessages});

    if (Object.keys(errorMessages).length) {
      return;
    }
    this.props.signup(signUpData).then(function(action){
      if( action.type === SIGNUP_SUCCESS ){
        browserHistory.push('/');
      }
    });
  }
}



export default SignUp;
