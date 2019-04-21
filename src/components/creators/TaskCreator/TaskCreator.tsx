import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { AppIcon } from '../../../components/widget/Icon';

import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../../../actions/actions';
import { bindActionCreators } from 'redux';
import { TaskCreatorModal } from './TaskCreatorModal';

import './TaskCreatorModal.scss';

const FormItem = Form.Item;

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
