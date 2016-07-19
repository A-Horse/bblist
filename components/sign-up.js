import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';

import {signUp} from '../actions/sign-up'

import {validateFormValue} from '../services/validate-strategy';

class SignUp extends Component {
  
  render() {
    
    return (
      <div>

        <div>
          <span>email</span>
          <input type='email' ref='email'/>  
        </div>
        
        <div>
          <span>username</span>
          <input type='text' ref='username'/>
        </div>
        
        <div>
          <span>password</span>
          <input type='password' ref='password'/>
        </div>

        <div>
          <span>repeat password</span>
          <input type='password' ref='repeat'/>
        </div>
        
        <button onClick={(event) => this.handleClick(event)} >Sign Up</button>
      </div>
    )
  }

  handleClick(event) {
    const { dispatch } = this.props;
    
    const username = this.refs.username;
    const password = this.refs.password;
    const repeat = this.refs.repeat;
    const email = this.refs.email;
    
    const userInfo = { username: username.value.trim(),
                       password: password.value.trim(),
                       email: email.value.trim(),
                       repeat: repeat.vlaue.trim()
                     };

    this.errorMessage = validateFormValue(userInfo, {
      username: ['required#required', 'max@100#max 100', 'min@3#min 3'],
      password: ['required', 'max@100#max 100', 'min@6#min 6'],
      repeat: ['required', 'max@100#max 100', 'min@6#min 6'],
      email: ['required', 'email#email express wrong', 'max@150#max 150']
    });

    if (!!this.errorMessage) {
      
    }
    
    dispatch(signUp(userInfo));
    //this.onLoginClick(creds)
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(SignUp)
