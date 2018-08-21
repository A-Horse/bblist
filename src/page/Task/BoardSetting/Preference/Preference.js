// @flow
import React, { Component } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../../../../actions/actions';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import './Preference.less';

class TaskBoardPreference extends Component<{ actions: any, taskBoardId: string }> {
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

  onCardModeChange = event => {
    console.log(event);
    this.props.actions.TASKBOARD_SETTING_UPDATE_REQUEST(
      {
        showType: event.target.value
      },
      { taskBoardId: this.props.taskBoardId }
    );
  };
}

export const TaskBoardPreferenceContainer = withRouter(
  connect(
    (state, props) => {
      const taskBoardId = props.match.params.id;

      return { taskBoardId };
    },
    dispatch => {
      return {
        actions: bindActionCreators(makeActionRequestCollection(), dispatch)
      };
    }
  )(TaskBoardPreference)
);
