import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'


class Profile extends Component {
  constructor() {
    super()
  }
  
  render() {

    return (
        <div>
        
        <h2>Profile</h2>

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
