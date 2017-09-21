import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { updateTitle } from 'services/title';
import { Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';

import Security from './Security/Security';
import Profile from './Profile/Profile.container';

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
              <Link to="/setting/profile">Profile</Link>
            </li>
            <li>
              <Link to="/setting/security">Security</Link>
            </li>
          </ul>
        </div>

        <div className="setting-panel">
          <Switch>
            <Route exact path="/setting" render={() => <Redirect to="/setting/profile" />} />
            <Route path="/setting/profile" component={Profile} />
            <Route path="/setting/security" component={Security} />
          </Switch>
        </div>
      </section>
    );
  }
}
