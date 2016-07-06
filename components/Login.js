import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Login extends Component {

  render() {
    const { errorMessage } = this.props

    return (
        <div>
        <input type='text' />
        <input type='password' />
        </div>
    )
  }

  handleClick(event) {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }     
}

export default connect()(Login)
