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


import 'style/page/todo/todo-repeat-chart-modal.scss';

export default class CardModal extends Component {

  componentWillMount() {
    this.state = {};

  }

  close() {

  }

  render() {

    return (
      <Modal className='todo-repeat-chart-modal' toggle={true} close={this.close.bind(this)}>
        <div className="modal-header">
          <div>Todo History Chart</div>
          <button className='close-button'>
            <IconRemove />
          </button>
        </div>
      </Modal>
    );
  }
}