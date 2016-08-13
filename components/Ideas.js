import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {PageContainer} from './widget/PageContainer';

class Ideas extends Component {
  constructor() {
    super()
  }

  getWalls() {
    
  }

  componentWillMount() {

  }
  
  render() {
    return (
      <PageContainer>
        Ideas
      </PageContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(Ideas)
