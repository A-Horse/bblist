import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'




class IndexPage extends Component {
  constructor() {
    super()
  }

  
  componentWillMount() {
    
  }

  
  render() {


    return (
      <PageContainer>
        Welcome
      </PageContainer>
    )
  }

  
}



export default IndexPage;






