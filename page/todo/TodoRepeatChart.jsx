import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import R from 'ramda';
import moment from 'moment';

import { deleteTaskCard, updateTaskCard, unactiveCardModal, getCardDetail } from 'actions/task/task-card';
import { getTaskAllCards } from 'actions/task/task-wall';
import { createTaskCardComment } from 'actions/task/task-card-comment';
import { CloseIcon, CommentIcon } from 'services/svg-icons';
import UserAvatar from 'components/UserAvatar';
import { Modal } from 'components/widget/Modal';
import { CheckBox } from 'components/widget/CheckBox';
import { Pomodoro } from 'components/Pomodoro';
import Textarea from 'react-textarea-autosize';
import { Hr } from 'components/widget/Hr';
import { Select } from 'components/widget/Select';
import { Button } from 'components/widget/Button';
import { isEnterKey } from 'utils/keyboard';
import { IconRemove, IconDelete, IconRight } from 'services/image-icon';
import Empty from 'components/Empty';

import 'style/page/todo/todo-repeat-chart-modal.scss';

export default class CardRepeatHistoryModal extends Component {

  componentWillMount() {
    this.state = {};
    // this.props.actions.getTodoRepeatHistory(this.props.tdId)
  }

  close() {
    this.props.actions.unactiveTdRepeatHistory();
  }

  renderHistoryTable() {
    return (
      <table>
        <tbody>
          <tr>
            <th key="text">Status</th>
            {
              this.props.repeatHistory.map(history => <th key={history.id}>{ history.isDone ? <IconRight /> : <IconDelete /> }</th>)
            }
          </tr>
          <tr>
            <th key="text">Dealine</th>
            {
              this.props.repeatHistory.map(history => <th key={history.id}>{ moment(history.created_at).subtract(1, 'days').format('MM-DD') }</th>)
            }
          </tr>

        </tbody>
      </table>
    );
  }

  render() {

    return (
      <Modal className='todo-repeat-chart-modal' toggle={this.props.repeatHistoryModalToggle} close={this.close.bind(this)}>
        <div className="modal-header">
          <div className="modal-header--heading">Todo History Chart</div>
          <button className='close-button' onClick={::this.close}>
            <IconRemove />
          </button>
        </div>

        {
          this.props.repeatHistory.length ? this.renderHistoryTable()
          : (
            <div className="todo-repeat-chart-modal--empty">
              <Empty />
              <div className="empty--text">There have not repeat history now.</div>
            </div>
          )
        }
        <div>

        </div>

      </Modal>
    );
  }
}
