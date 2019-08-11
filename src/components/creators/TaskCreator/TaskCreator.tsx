import React, { Component } from 'react';
import { AppIcon } from '../../../components/widget/Icon';
import { TaskCreatorModal } from './TaskCreatorModal';

import './TaskCreatorModal.scss';

export class TaskCreator extends Component<{}, any> {
  state = {
    modalVisible: false,
    errorMessages: [],
    name: ''
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    return (
      <div className="taskboard-creater">
        <div onClick={() => this.setState({ modalVisible: true })}>
          <AppIcon icon="cube" />
          Task
        </div>

        <TaskCreatorModal modalVisible={this.state.modalVisible} closeModal={this.handleCancel} />
      </div>
    );
  }
}
