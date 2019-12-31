import './SettingPage.scss';

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

import { updateTitle } from '../../services/title';
import Profile from './Profile/Profile.container';
import { SettingSecurityContainer } from './Security/Security';

export default class Setting extends Component<any> {
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
            <Route
              exact
              path="/setting"
              render={() => <Redirect to="/setting/profile" />}
            />
            <Route path="/setting/profile" component={Profile} />
            <Route
              path="/setting/security"
              component={SettingSecurityContainer}
            />
          </Switch>
        </div>
      </section>
    );
  }
}
