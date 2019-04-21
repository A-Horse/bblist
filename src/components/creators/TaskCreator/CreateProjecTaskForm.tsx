import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';

const FormItem = Form.Item;

import './TaskCreatorModal.scss';

class CreateProjectTaskFormBase extends Component<
  {
    form: any;
    style: any
  },
  any
> {
  state = {
    modalVisible: false,
    errorMessages: [],
    name: ''
  };

  handleSubmit() {}

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={this.props.style} className="taskboard-creater">
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Task Title">
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
    );
  }
}

export const CreateProjectTaskForm = Form.create()(CreateProjectTaskFormBase);
