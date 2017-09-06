import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import { isEnterKey } from 'utils/keyboard';
import ClickOutSide from 'components/utils/ClickOutSide';
import { Button } from 'components/widget/Button';
import DatePicker from 'components/DatePicker/DatePicker';
import { Select } from 'components/widget/Select';

import './TodoCreater.scss';
import { repeatItems } from '../constants';

class TodoCreater extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.createTodo = this.createTodo.bind(this);
  }

  componentWillMount() {
    this.state = {
      toggle: true
    };
  }

  createTodo() {
    const data = {
      content: this.refs.content.value.trim(),
      deadline: this.refs.datePicker.value ? this.refs.datePicker.value.getTime() : null
    };
    this.props.actions.ADD_TODO_FN(data);
    this.close();
  }

  toggle() {
    this.setState({ toggle: true });
  }

  close() {
    if (this.refs.datePicker.state.toggle) {
      return;
    }

    this.setState({ toggle: false });
  }

  onInputKeyDown(event) {
    if (isEnterKey(event)) {
      event.preventDefault();
      this.createTodo();
    }
  }

  render() {
    if (!this.state.toggle) {
      return (
        <div className="todo-creater--toggle" onClick={this.toggle}>
          <i className="fa fa-plus" aria-hidden="true" />
          <span className="toggle-text">Add Todo</span>
        </div>
      );
    }
    return (
      <ClickOutSide onClickOutside={this.close}>
        <div className="todo-creater-body">
          <div className="todo-creater--input">
            <Textarea
              onKeyDown={this.onInputKeyDown}
              placeholder="write your todo"
              className="todo-creater--content"
              type="text"
              ref="content"
            />
          </div>

          <div className="todo-creater-props todo-creater-deadline">
            <label>Deadline:</label>
            <DatePicker ref="datePicker" arrow="auto" />
          </div>

          <div className="todo-creater-props todo-creater-repeat">
            <label>Repeat:</label>
            <Select
              items={repeatItems}
              onSelect={repeat => this.updateTodo({ repeat: repeat.value })}
            />
          </div>

          <div className="todo-creater-operation">
            <Button styleType="primary" onClick={this.createTodo}>
              Create Todo
            </Button>
            <Button className="cancel-button" styleType="default" onClick={this.close}>
              Cancel
            </Button>
          </div>
        </div>
      </ClickOutSide>
    );
  }
}

export default TodoCreater;
