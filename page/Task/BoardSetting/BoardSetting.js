import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'components/widget/Modal/Modal';
import ReactCrop from 'react-image-crop';
import { ImageUploader } from 'components/ImageUploader';
import R from 'ramda';

import Infomation from './Infomation/Infomation';
import Operation from './Operation/Operation';
import Preference from './Preference/Preference';

import { Route, Switch } from 'react-router';

import { Link } from 'react-router-dom';

import './BoardSetting.scss';

export class BoardSetting extends Component {
  componentWillMount() {}

  componentWillReceiveProps() {}

  deleteTaskBoard() {
    this.props.deleteBoard(this.props.params.id);
  }

  switchPanel(panel) {
    this.setState({ currentPanel: panel });
  }

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
          </ul>
        </div>

        <div className="board-setting-panel">
          <Switch>
            <Route path="infomation" component={Infomation} />
            <Route path="preference" component={Operation} />
            <Route path="operation" component={Preference} />
          </Switch>
        </div>
      </section>
    );
  }
}

export default BoardSetting;
