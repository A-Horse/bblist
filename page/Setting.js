import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'



class Setting extends Component {
  constructor() {
    super()
    
    
  }
  
  render() {

    return (
        <div>
        
        <h2>Setting</h2>
        
        </div>
    )
  }

  
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(Setting)
