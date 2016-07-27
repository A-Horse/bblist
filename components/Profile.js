import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import {makeGravatarUrl} from '../services/gravatar';


class Profile extends Component {
  constructor() {
    super()
  }
  
  render() {
    const {user} = this.props;

    if( user ){
      return (
        <div>
          
          <h2>Profile</h2>

          <div>
            <img src={makeGravatarUrl(user.email)}/>
          </div>

          <div>
            <span>Password</span>
            <button>Change Password</button>
          </div>
          
        </div>
      )
    }
    return (
      <div>Loading........</div>
    )
  }

  
}

const mapStateToProps = (state) => {
  return {
    user: state.login.state.loginUser
  }
}

export default connect(mapStateToProps)(Profile)
