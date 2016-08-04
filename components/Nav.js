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

let activeLink = {
  color: 'black'
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

  activelyLink(linkStyle) {
    return Object.assign({}, linkStyle, activeLink);
  }
  
  render() {
    
    const userCell = this.renderUserCell();

    let path = R.second(this.props.path.split('/'));

    // switch(path) {
    //   //TODO extract global var
    // case 'task-wall':
    //   let linkStyle = Object.assign({}, linkStyle, activeLink);
    //   break;
    // }

    
    return (
      <header style={headerStyle} className="clearfix">
        

        <Link to="/" style={linkStyle}>Home</Link>

        <Link to="/task-wall" style={path === 'task-wall' ? this.activelyLink(linkStyle) : linkStyle}>Task</Link>

        <Link to="/idea" style={linkStyle}>Idea</Link>

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
    user: state.login.state.loginUser,
    path: state.routing.locationBeforeTransitions.pathname
  }
};



export default connect(mapStateToProps)(Nav);

