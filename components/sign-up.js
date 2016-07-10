import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'

import {signUp} from '../actions/sign-up'

class SignUp extends Component {
  
  render() {
    
    return (
        <div>
        <input type='text' ref='username'/>
        <input type='password' ref='password'/>
        <button onClick={(event) => this.handleClick(event)} >Sign Up</button>
        </div>
    )
  }

  handleClick(event) {
    const { dispatch } = this.props
    
    const username = this.refs.username
    const password = this.refs.password
    const userInfo = { username: username.value.trim(), password: password.value.trim() }
    
    dispatch(signUp(userInfo))
    //this.onLoginClick(creds)
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(SignUp)
