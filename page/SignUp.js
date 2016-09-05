import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signUp} from '../actions/sign-up'
import {validateFormValue} from '../services/validate-strategy';
import { browserHistory } from 'react-router'

import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../actions/sign-up'

class SignUp extends Component {

  constructor() {
    super();
    
  }

  componentWillMount() {
    this.state = {
      errorMessage: {}
    }
  }
  
  render() {
    const errorMessage = this.state.errorMessage;
    
    return (
      <form>

        <div>
          <span>email</span>
          <input type='email' name="bblist-email" ref='email'/>
          <p>{errorMessage.email}</p>
        </div>
        
        <div>
          <span>username</span>
          <input type='text' name="bblist-username" ref='username'/>
          <p>{errorMessage.username}</p>
        </div>
        
        <div>
          <span>password</span>
          <input type='password' name="bblist-password" ref='password'/>
          <p>{errorMessage.password}</p>
        </div>

        <div>
          <span>repeat password</span>
          <input type='password' name="bblist-repeat" ref='repeat'/>
          <p>{errorMessage.repeat}</p>
        </div>

        <button type="submit" onClick={(event) => this.handleClick(event)} >Sign Up</button>
      </form>
    )
  }

  handleClick(event) {
    event.preventDefault();
    
    const { dispatch } = this.props;
    
    const username = this.refs.username;
    const password = this.refs.password;
    const repeat = this.refs.repeat;
    const email = this.refs.email;

    this.refs.username.value = 'abychen';
    this.refs.email.value = 'abychen@outlook.com';
    this.refs.password.value = '123456';
    this.refs.repeat.value = '123456';
    
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
    
  }
}

export default connect(mapStateToProps)(SignUp)
