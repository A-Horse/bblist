import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import {makeGravatarUrl} from '../services/gravatar';

import Loading from './util/loading';

class Profile extends Component {
  constructor() {
    super()
  }

  
  componentWillMount() {
    this.state = {
      showChangePassword: false
    }
  }

  // TODO cached picture to localstorage
  render() {
    const {user} = this.props;

    let changePasswordArea;
    if( this.state.showChangePassword ){
      changePasswordArea = (
        <div>
          <div>
            <span>password</span>
            <input type='text' ref='password'/>
          </div>

          <div>
            <span>password</span>
            <input type='text' ref='newPassword'/>
          </div>

          <div>
            <span>repeat password</span>
            <input type='text' ref='repeat'/>
          </div>
        </div>
      )
    }


    if( user ){
      return (
        <div>
          
          <h2>Profile</h2>

          <div>
            <img src={makeGravatarUrl(user.email)}/>
          </div>

          <div>
            <button onClick={() => this.setState({showChangePassword: true})}>Change Password</button>
          </div>

          {changePasswordArea}
          
        </div>
      )
    }
    return (
      <Loading/>
    )
  }

  
}

const mapStateToProps = (state) => {
  return {
    user: state.login.state.loginUser
  }
}

export default connect(mapStateToProps)(Profile)
