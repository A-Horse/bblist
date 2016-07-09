import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'

import {postTaskCard } from '../actions/task-card'

class TaskCard extends Component {
  constructor() {
    console.log('task card page init')
  }

  getTasks() {
    
  }
  
  render() {
    const { errorMessage } = this.props
    const {STA} = this.props;
    
    const tasks = this.getTasks();
    
    return (
      <div>
        <div>
          <h2>Task</h2>
          
        </div>
        <div>
          <input type='text' ref='username'/>
          <input type='text' ref='name'/>
          <button onClick={(event) => this.handleClick(event)} >Post</button>
        </div>
      </div>
    )
  }

  handleClick(event) {
    // const { dispatch } = this.props
    
    // const username = this.refs.username
    // const password = this.refs.password
    // const creds = { username: username.value.trim(), password: password.value.trim() } 
    
    // dispatch(loginUser(creds))
    //this.onLoginClick(creds)
  }
}

const mapStateToProps = (state) => {
  
}

export default connect(mapStateToProps)(TaskCard)
