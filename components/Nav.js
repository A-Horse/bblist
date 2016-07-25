import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import {makeGravatarHash} from '../services/gravatar';

import {authUser} from '../actions/login';

class Nav extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    let {dispatch} = this.props;
    dispatch(authUser());
  }
  
  render() {

    return (
      <header>
        Links:
        {' '}
        <Link to="/">Home2</Link>
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
    user: state.user
  };
}

export default connect(mapStateToProps)(Nav);

