import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'

import {loginUser} from '../actions/login'

import { browserHistory } from 'react-router'

import {validateFormValue} from '../services/validate-strategy';

class Login extends Component {

  
  componentWillMount() {
    this.state = {
      errorMessage: {}
    }
  }


  render() {
    const errorMessage = this.state.errorMessage;
    
    return (
      <div>
        <div>

          <div>
            <input type='text' ref='usernameOrEmail'/>
            <p>{errorMessage.usernameOrEmail}</p>
          </div>
          
          <div>
            <input type='password' ref='password'/>
            <p>{errorMessage.password}</p>
          </div>

          <div>
            <button onClick={(event) => this.handleClick(event)} >Login</button>
          </div>
          
        </div>
        
        
        <a href="/signup">Sign Up</a>
      </div>
    )
  }

  handleClick(event) {
    const { dispatch } = this.props
    
    const usernameOrEmail = this.refs.usernameOrEmail;
    const password = this.refs.password;
    
    const loginInfo = {
      usernameOrEmail: usernameOrEmail.value.trim(),
      password: password.value.trim()
    };

    const errorMessage = validateFormValue(loginInfo, {
      usernameOrEmail: ['required#required'],
      password: ['required#required']
    });


    this.setState({errorMessage: errorMessage});
    

    if( !Object.keys(errorMessage).length ){
      dispatch(loginUser(loginInfo)).then(function(action){
        // if( action.type === SIGNUP_SUCCESS ){
        //   browserHistory.push('/');
        // }
      });
    }
    //dispatch(loginUser(loginInfo))
    //this.onLoginClick(creds)
  }
}

const mapStateToProps = (state) => {
  return {
    STA: state.login.auth.message
  }
}

export default connect(mapStateToProps)(Login)
