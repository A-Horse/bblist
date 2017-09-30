import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import Infomation from './Infomation/Infomation';
import Operation from './Operation/Operation';
import Preference from './Preference/Preference';
import Participant from './Participant/Participant';

import { Link } from 'react-router-dom';

import './BoardSetting.scss';

export class BoardSetting extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    board: PropTypes.object,
    loginedUser: PropTypes.object
  };
  render() {
    return (
      <section className="board-setting-page">
        <div className="board-setting-side-bar">
          <ul>
            <li>
              <Link to={`infomation`}>Infomation</Link>
            </li>
            <li>
              <Link to={`preference`}>Preference</Link>
            </li>
            <li>
              <Link to={`operation`}>Operation</Link>
            </li>
            <li>
              <Link to={`participant`}>Participant</Link>
            </li>
          </ul>
        </div>

        <div className="board-setting-panel">
          <Switch>
            <Route
              path="/task-board/:id/setting/infomation"
              render={() => <Infomation {...this.props} />}
            />
            <Route
              path="/task-board/:boardId/setting/participant"
              render={props => <Participant {...this.props} {...props} />}
            />
            <Route
              path="/task-board/:id/setting/preference"
              render={() => <Preference {...this.props} />}
            />
            <Route
              path="/task-board/:id/setting/operation"
              render={() => <Operation {...this.props} />}
            />
          </Switch>
        </div>
      </section>
    );
  }
}

export default BoardSetting;
