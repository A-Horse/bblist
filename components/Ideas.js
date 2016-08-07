import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {Modal} from './widget/Modal';

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
      <div>
        Ideas
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(Ideas)
