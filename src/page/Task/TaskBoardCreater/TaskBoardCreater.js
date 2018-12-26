//
import React, { Component } from 'react';
import { Button, Icon, Modal, Form, Input } from 'antd';

import './TaskBoardCreater.scss';

const FormItem = Form.Item;

class TaskBoardCreaterForm extends Component {
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

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.actions.ADD_TASK_BOARD_REQUEST(values);
        this.handleCancel();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="taskboard-creater">
        <Button type="default" onClick={() => this.setState({ modalVisible: true })}>
          <Icon type="plus" />
          Create Task Board
        </Button>

        <Modal
          title="Create Wall"
          onCancel={this.handleCancel}
          visible={this.state.modalVisible}
          footer={null}
        >
          <div>
            <img className="taskboard-creater--illustration" src="/assets/images/work.png" />

            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input task board name' }]
                })(<Input type="text" placeholder="Board Name" />)}
              </FormItem>

              <FormItem>
                <Button type="primary" htmlType="submit">
                  Done
                </Button>
              </FormItem>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

export const TaskBoardCreater = Form.create()(TaskBoardCreaterForm);
