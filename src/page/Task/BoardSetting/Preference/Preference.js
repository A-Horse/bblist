// @flow
import React, { Component } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

import './Preference.less';

export class Preference extends Component<{}> {
  render() {
    return (
      <div className="board-setting-preference">
        <h3>Preference</h3>

        <div className="board-notification">
          <div className="board-notification--heading">Notification:</div>
        </div>

        <div>
          <div className="">Card Mode:</div>

          <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio value={'Colmn'}>Columns</Radio>
            <Radio value={'List'}>List</Radio>
          </RadioGroup>
        </div>
      </div>
    );
  }

  onNotificationSettingChange() {}

  onCardModeChange() {}
}
