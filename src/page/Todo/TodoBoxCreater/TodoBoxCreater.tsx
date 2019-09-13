import './TodoBoxCreater.scss';

import {  Form, Icon, Input, Modal } from 'antd';
import React, { Component } from 'react';
import { AppButton } from '../../../components/widget/Button';

const FormItem = Form.Item;

export class TodoBoxCreaterForm extends Component<any> {
  state = { toggle: false, name: '' };

  close = () => {
    this.setState({ toggle: false });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        this.props.actions.ADD_TODOBOX_REQUEST(values);
        this.handleCancel();
      }
    });
  };

  handleCancel = () => {
    this.setState({
      toggle: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div onClick={(event: any) => {
        event.stopPropagation();
        this.setState({ toggle: true });
      }}>
        <Icon type="folder-add" />
          Add Todo Box

        <Modal
          className="todo-box-creater-modal"
          title="Create Todo Box:"
          onCancel={this.handleCancel}
          visible={this.state.toggle}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input Todo Box name' }]
              })(<Input type="text" placeholder="Todo Box" />)}
            </FormItem>

            <FormItem>
              <AppButton type="submit">
                Done
              </AppButton>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export const TodoBoxCreater = Form.create()(TodoBoxCreaterForm);
