// @flow
import React, { Component } from 'react';
import { Input, Icon, Form, DatePicker, Row, Col } from 'antd';
import { formShape } from 'rc-form';

import './TodoCreater.less';

const InputGroup = Input.Group;
const FormItem = Form.Item;

class TodoCreaterForm extends Component<
  { form: formShape, submit: any => {} },
  {
    toggle: boolean,
    content: string
  }
> {
  state = {
    toggle: false,
    content: '',
    deadline: null
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
    return (
      <div class="todo-creater">
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <Icon type="plus" />
            <InputGroup compact>
              <Input
                onChange={value => this.setState({ content: value })}
                onPressEnter={this.handleSubmit}
                placeholder="Add Todo..."
              />
              <DatePicker />
            </InputGroup>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export const TodoCreater = Form.create()(TodoCreaterForm);
