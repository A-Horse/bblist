//
import React, { Component } from 'react';
import { Input, Form, Button, Icon, Modal } from 'antd';
import { formShape } from 'rc-form';

import './TodoBoxCreater.less';

const FormItem = Form.Item;

export class TodoBoxCreaterForm extends Component {
  state = { toggle: false, name: '' };

  close = () => {
    this.setState({ toggle: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
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
      <div>
        <Button
          className=""
          onClick={event => {
            event.stopPropagation();
            this.setState({ toggle: true });
          }}
        >
          <Icon type="folder-add" />
          Add Todo Box
        </Button>

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
              <Button type="primary" htmlType="submit">
                Done
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export const TodoBoxCreater = Form.create()(TodoBoxCreaterForm);
