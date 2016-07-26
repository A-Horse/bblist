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
    
    const userCell = this.renderUserCell();
    
    
    return (
      <header>
        <span>Links:</span>
        {' '}
        <Link to="/">Home2</Link>
        {' '}
        <Link to="/foo">Foo</Link>
        {' '}
        <Link to="/bar">Bar</Link>
        {' '}
        { userCell }
      </header>
    )
  }

  renderUserCell() {
    const user = this.props.user;
    
    const cachedUsername = localStorage.getItem('cachedUsername');

    if( cachedUsername ){
      return (
        <Link to="/profile">{cachedUsername}</Link>
      );
    }
    return (
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
      </div>
    );
  }
  
  
}

const mapStateToProps = (state) => {
  return {
    user: state.login.state.loginUser
  }
};

export default connect(mapStateToProps)(Nav);

