import './IssueCreatorModal.scss';

import React, { Component } from 'react';

import { AppIcon } from '../../../widget/Icon';
import { IssueCreatorModal } from './IssueCreatorModal';

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

        <IssueCreatorModal
          modalVisible={this.state.modalVisible}
          closeModal={this.handleCancel}
        />
      </div>
    );
  }
}
