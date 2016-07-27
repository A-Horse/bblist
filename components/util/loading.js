import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {makeGravatarUrl} from '../services/gravatar';

let _ = require('lodash');


class Loading extends Component {
  constructor() {
    super();

    this.dotn = 1;
  }

  componentWillMount() {
    
  }
  
  render() {

    const dots = _.repeat('.', this.dotn);
    this.dotn++;
    if( this.dotn > 10 ){
      this.dotn = 1;
    }
    
    return (
        <div>
        loading{dots}
        </div>
    )
  }

  
}


export default Loading;
