import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'

import {loginUser} from '../actions/login'

class Login extends Component {
  LOGIN_API = '/api/login';
  STA = 'hi'
  
  render() {
    const { errorMessage } = this.props
    const {STA} = this.props;
    return (
      <div>
        {STA}
        <input type='text' ref='username'/>
        <input type='password' ref='password'/>
        <button onClick={(event) => this.handleClick(event)} >Login</button>
        </div>
    )
  }

  handleClick(event) {
    const { dispatch } = this.props
    
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    
    dispatch(loginUser(creds))
    //this.onLoginClick(creds)
  }
}

const mapStateToProps = (state) => {
  return {
    STA: state.login.auth.message
  }
}

export default connect(mapStateToProps)(Login)
