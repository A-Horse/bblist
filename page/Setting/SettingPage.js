import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { updateTitle } from 'services/title';
import { Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';

import Security from './Security/Security';
import Profile from './Profile/Profile';

import './SettingPage.scss';

export default class Setting extends Component {
  componentDidMount() {
    updateTitle('Setting');
  }

  render() {
    return (
      <section className="setting-page">
        <div className="setting-side-bar">
          <ul>
            <li>
              <Link activeClassName="active" to="/setting/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/setting/security">
                Security
              </Link>
            </li>
          </ul>
        </div>

        <div className="setting-panel">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="profile" />} />
            <Route path="profile" component={Profile} />
            <Route path="security" component={Security} />
          </Switch>
        </div>
      </section>
    );
  }
}
