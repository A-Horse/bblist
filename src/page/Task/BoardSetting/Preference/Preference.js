// @flow
import React, { Component } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../../../../actions/actions';

import { connect } from 'react-redux';

import './Preference.less';

class TaskBoardPreference extends Component<{ actions: any }> {
  render() {
    return (
      <div className="board-setting-preference">
        <h3>Preference</h3>

        <div className="board-notification">
          <div className="board-notification--heading">Notification:</div>
        </div>

        <div>
          <div className="">Card Mode:</div>

          <RadioGroup onChange={this.onCardModeChange} value={'Column'}>
            <Radio value={'Column'}>Columns</Radio>
            <Radio value={'List'}>List</Radio>
          </RadioGroup>
        </div>
      </div>
    );
  }

  onNotificationSettingChange() {}

  onCardModeChange = (value: 'Column' | 'List') => {
    this.props.actions.TASKBOARD_SETTING_UPDATE_REQUEST(
      {
        showType: value
      },
      { taskBoardId: null }
    );
  };
}

export const TaskBoardPreferenceContainer = connect(
  state => {
    return {};
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TaskBoardPreference);
