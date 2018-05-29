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
          <InputGroup compact style={{ display: 'flex' }}>
            <Input
              onPressEnter={this.handleSubmit}
              addonBefore={<Icon type="plus" />}
              placeholder="Add Todo..."
            />
            <DatePicker />
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export const TodoCreater = Form.create()(TodoCreaterForm);
