import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import {makeGravatarHash} from '../services/gravatar';

class Nav extends Component {
  constructor() {
    super()
  }
  
  render() {

    return (
      <header>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/foo">Foo</Link>
        {' '}
        <Link to="/bar">Bar</Link>
      </header>
    )
  }

  
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(Nav);

