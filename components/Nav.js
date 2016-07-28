import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import {makeGravatarHash} from '../services/gravatar';

import {authUser} from '../actions/login';

import Loading from './util/loading';

let R = require('fw-ramda');

let headerStyle = {
  width: '100%',
  backgroundColor: '#8fdad7',
  padding: '6px 8px',
  boxSizing: 'border-box'
};

let linkStyle = {
  textDecoration: 'none',
  float: 'left',
  marginLeft: '10px',
  color: 'red'
};

let floatRight = {
  float: 'right'
};

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
      <header style={headerStyle} className="clearfix">
        

        <Link to="/" style={linkStyle}>Home</Link>

        <Link to="/task-wall" style={linkStyle}>Task</Link>

        <Link to="/bar" style={linkStyle}>Idea</Link>

        { userCell }
      </header>
    )
  }

  renderUserCell() {
    const user = this.props.user;
    
    const cachedUsername = localStorage.getItem('cachedUsername');

    if( cachedUsername ){
      return (
        <div>
          <Link to="/profile" style={R.merge(linkStyle, floatRight)}>{cachedUsername}</Link>
          <Link to="/" style={R.merge(linkStyle, floatRight)}>Log out</Link>
        </div>
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

