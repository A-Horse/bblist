import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {PageContainer} from './widget/PageContainer';


class DashBoard extends Component {
  constructor() {
    super()
    
    
  }
  
  render() {

    return (
        <div>
        
        <div>
        <h2>Task</h2>
        </div>

        <div>
        <h2>Idea</h2>
        </div>

        <div>
        <h2>Chat</h2>
        </div>
        
        </div>
    )
  }

  
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(DashBoard)
