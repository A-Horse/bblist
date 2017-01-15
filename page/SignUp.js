import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signUp} from '../actions/sign-up';
import {validateFormValue} from '../services/validate-strategy';
import { browserHistory } from 'react-router';
import {PageContainer} from 'components/widget/PageContainer';
import {Input} from '../components/widget/Input';
import {updateTitle} from 'services/title';
import {Button} from '../components/widget/Button';
import {isEnterKey} from 'utils/keyboard';
import {Link} from 'react-router';

import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../actions/sign-up';

import 'style/page/signup.scss';

class SignUp extends Component {

  constructor() {
    super();
    
  }

  componentDidMount() {
    updateTitle('Sign Up');
  }

  componentWillMount() {
    this.state = {
      errorMessage: {}
    };
  }
  
  render() {
    const errorMessage = this.state.errorMessage;
    
    return (
      <PageContainer className='signup-page'>
        <form ref='form' className='signup-form' onSubmit={this.signup.bind(this)}>

          <div>
            <Input type='text' ref='email' name='bblist-email' required placeholder="Email"/>
          </div>

          <div>
            <Input type='text' onKeyDown={this.inputOnKeyDown.bind(this)} ref='name' name='bblist-name' required placeholder="Name"/>
          </div>

          <div>
            <Input type='password' ref='password' name='bblist-password' required placeholder="Password"/>
          </div>

          <div>
            <Input type='password' ref='password' name='bblist-repeat' required placeholder="Password Repeat"/>
          </div>

          <Button className='signup-button' type='submit' styleType='primary' size='large'>Sign Up</Button>
        </form>
        <div>
          Already has an Account?
          <Link className='signin-link' to="/signin">Sign In</Link>
        </div>
      </PageContainer>
    );
  }

  inputOnKeyDown(event) {
    isEnterKey(event) && this.signup();
  }

  signup(event) {
    event.preventDefault();
    
    const { dispatch } = this.props;
    
    const username = this.refs.username;
    const password = this.refs.password;
    const repeat = this.refs.repeat;
    const email = this.refs.email;
    
    // this.refs.username.value = 'abychen';
    // this.refs.email.value = 'abychen@outlook.com';
    // this.refs.password.value = '123456';
    
    const userInfo = {
      username: username.value.trim(),
      password: password.value.trim(),
      email: email.value.trim(),
      repeat: repeat.value.trim()
    };
    
    const errorMessage = validateFormValue(userInfo, {
      username: ['required#required', 'max@100#max 100', 'min@3#min 3'],
      password: ['required#required', 'max@100#max 100', 'min@6#min 6'],
      repeat: ['required#required', `eqTo@${userInfo.password}#password don't match`],
      email: ['required#required', 'email#email express wrong', 'max@150#max 150']
    });
    
    this.setState({errorMessage: errorMessage});
    

    if( !Object.keys(errorMessage).length ){
      dispatch(signUp(userInfo)).then(function(action){
        if( action.type === SIGNUP_SUCCESS ){
          browserHistory.push('/');
        }
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
};

export default connect(mapStateToProps)(SignUp);
