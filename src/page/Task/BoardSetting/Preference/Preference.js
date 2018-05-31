// @flow
import React, { Component } from 'react';

import './Preference.less';

export class Preference extends Component<{}> {
  render() {
    return (
      <div className="board-setting-preference">
        <h3>Preference</h3>

        <div className="board-notification">
          <div className="board-notification--heading">Notification:</div>
        </div>
      </div>
    );
  }

  onNotificationSettingChange() {}
}
