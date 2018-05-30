// @flow
import React, { Component } from 'react';
import { Input, Icon, Form, DatePicker, Row, Col, message } from 'antd';

import './TodoCreater.less';

const InputGroup = Input.Group;
const FormItem = Form.Item;

export class TodoCreater extends Component<
  { submit: any },
  {
    content: string,
    deadline: number | null
  }
> {
  state = {
    content: '',
    deadline: null
  };

  handleSubmit = (event: SyntheticInputEvent<*>) => {
    event.preventDefault();
    if (!this.state.content) {
      return message.error('Please input todo content');
    }
    console.log(this.state);

    this.props.submit({
      content: this.state.content,
      deadline: this.state.deadline ? this.state.deadline.valueOf() : null
    });

    this.setState({
      content: '',
      deadline: null
    });
  };

  render() {
    return (
      <div className="todo-creater">
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <Icon type="plus" />
            <InputGroup compact>
              <Input
                value={this.state.content}
                onChange={event => this.setState({ content: event.target.value })}
                onPressEnter={this.handleSubmit}
                placeholder="Add Todo..."
              />
              <DatePicker
                value={this.state.deadline}
                onChange={date => this.setState({ deadline: date })}
                placeholder="Deadline"
              />
            </InputGroup>
          </FormItem>
        </Form>
      </div>
    );
  }
}
