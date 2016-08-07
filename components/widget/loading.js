import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';



let _ = require('lodash');


class Loading extends Component {
  constructor() {
    super();

    this.dotn = 1;

    this.interval = null;
  }

  componentWillMount() {
    let self = this;

    this.state = {
      dotn: 1
    }
    
    this.interval = setInterval(function(){
      let dotn = ++self.state.dotn;
      if( dotn > 10 ){
        dotn = 1;
      }
      self.setState({
        dotn: dotn
      })
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    let dots = _.repeat('.', this.state.dotn);
    return (
        <div>
        loading{dots}
        </div>
    );
  }
}


export default Loading;
