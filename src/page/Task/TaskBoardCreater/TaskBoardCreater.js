import React, { Component } from 'react';
import { Input } from 'components/widget/Input/Input';
import { ErrorMsg } from 'components/ErrorMsg/ErrorMsg';
import { Button, Icon, Modal } from 'antd';
import { validateFormValue } from 'services/validate-strategy';
import R from 'ramda';

import './TaskBoardCreater.scss';

class TaskBoardCreater extends Component {
  state = {
    modalVisible: false,
    errorMessages: [],
    name: ''
  };

  onCreateClick = event => {
    event.preventDefault();
    const data = { name: this.state.name.trim() };

    const errorMessages = validateFormValue(data, {
      name: ['required@Please fill the name.']
    });

    this.setState({ errorMessages: errorMessages });

    if (Object.keys(errorMessages).length) {
      return;
    }
    this.props.actions.ADD_TASK_BOARD_REQUEST(data);
    this.closeModal();
  };

  handleOk = () => {
    this.setState({
      modalVisible: false
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    return (
      <div className="taskboard-creater">
        <Button type="default" onClick={() => this.setState({ modalVisible: true })}>
          <Icon type="plus" />Create Task Board
        </Button>

        {this.state.modalVisible}

        <Modal
          title="Create Wall"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          visible={this.state.modalVisible}
          footer={null}
        >
          <div>
            <img className="taskboard-creater--illustration" src="/assets/images/work.png" />

            <Input
              className="taskboard-creater--name-input"
              type="text"
              placeholder="Board Name"
              onChange={value => this.setState({ name: value })}
              onKeyPress={event => event.key === 'Enter' && this.onCreateClick.bind(this)(event)}
            />
            <ErrorMsg messages={R.values(this.state.errorMessages)} />
            <Button className="taskboard-creater--create-button" onClick={this.onCreateClick}>
              Complete And Create
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default TaskBoardCreater;
