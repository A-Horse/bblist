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
    const email = 'abychen@outlook.com';


    return (
        <div>
        
        <h2>Profile</h2>

        <div>
          <img src={makeGravatarUrl(email)}/>
        </div>

        <div>
        <span>Password</span>
        <button>Change Password</button>
        </div>
        
        </div>
    )
  }

  
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(Profile)
