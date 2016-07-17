import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'



class NotFound extends Component {
  constructor() {
    super()
  }


  
  render() {
    return (
      <div>
        <h2>404</h2>
      </div>
    )
  }

  
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(NotFound)
