import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import R from 'ramda';
import moment from 'moment';

import { deleteTaskCard, updateTaskCard, unactiveCardModal, getCardDetail } from 'actions/task/task-card';
import { getTaskAllCards } from 'actions/task/task-wall';
import { createTaskCardComment } from 'actions/task/task-card-comment';
import { spawnMixinRender } from 'style/theme-render';
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
import { IconRemove } from 'services/image-icon';
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

  render() {

    return (
      <Modal className='todo-repeat-chart-modal' toggle={this.props.repeatHistoryModalToggle} close={this.close.bind(this)}>
        <div className="modal-header">
          <div>Todo History Chart</div>
          <button className='close-button' onClick={::this.close}>
            <IconRemove />
          </button>
        </div>

        {
          this.props.repeatHistory.length ? (
            <Empty />
          ) : (
            <div>
              <Empty />
              <div>There have not repeat history now.</div>
            </div>
          )
        }
        <div>

        </div>

      </Modal>
    );
  }
}
