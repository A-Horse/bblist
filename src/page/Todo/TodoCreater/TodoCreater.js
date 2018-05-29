// @flow
import React, { Component } from 'react';
import { Input, Icon, Form, DatePicker, Row, Col } from 'antd';
import { formShape } from 'rc-form';

import './TodoCreater.scss';

const InputGroup = Input.Group;
const FormItem = Form.Item;

class TodoCreaterForm extends Component<
  { form: formShape, submit: any => {} },
  {
    toggle: boolean
  }
> {
  state = {
    toggle: false
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup compact>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: 'Please input content' }]
            })(
              <Input
                onPressEnter={this.handleSubmit}
                addonBefore={<Icon type="plus" />}
                placeholder="Add Todo..."
              />
            )}
            {getFieldDecorator('deadline', {
              rules: []
            })(<DatePicker />)}
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export const TodoCreater = Form.create()(TodoCreaterForm);
