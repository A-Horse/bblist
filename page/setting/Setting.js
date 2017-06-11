
import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import {connect } from 'react-redux';
import {updateTitle} from 'services/title';
import {Link, browserHistory} from 'react-router';

import 'style/setting/setting.scss';

export default class Setting extends Component {
  componentDidMount() {
    updateTitle('Setting');
  }

  renderSideBar() {
    return (
      <ul>
        <li><Link activeClassName='active' to='/setting/profile'>Profile</Link></li>
        <li><Link activeClassName='active' to='/setting/security'>Security</Link></li>
      </ul>
    );
  }

  render() {
    return (
      <section className='setting-page'>
        <div className='setting-side-bar'>
          {this.renderSideBar()}
        </div>

        <div className='setting-panel'>
          {this.props.children}
        </div>

      </section>
    );
  }
}
