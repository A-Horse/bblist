import React, { Component, FormEvent } from 'react';
import { Input, Icon, Form, DatePicker, message } from 'antd';

import './TodoCreater.scss';

const InputGroup = Input.Group;
const FormItem = Form.Item;

export class TodoCreater extends Component<any, any> {
  // TODO remove
  input :any;

  state = {
    content: '',
    deadline: null
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!this.state.content) {
      return message.error('Please input todo content');
    }

    this.props.submit({
      content: this.state.content,
      deadline: this.state.deadline ? (this.state.deadline as any).valueOf() : null
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
                ref={input => (this.input = input)}
                value={this.state.content}
                onChange={event => this.setState({ content: event.target.value })}
                onPressEnter={this.handleSubmit}
                placeholder="Add Todo..."
              />
              <DatePicker
                value={this.state.deadline as any}
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
