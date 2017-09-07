import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import { isEnterKey } from 'utils/keyboard';
import ClickOutSide from 'components/utils/ClickOutSide';
import { Button } from 'components/widget/Button/Button';
import DatePicker from 'components/DatePicker/DatePicker';
import { Select } from 'components/widget/Select';

import './TodoCreater.scss';
import { repeatItems } from '../constants';

class TodoCreater extends Component {
  state = {
    toggle: true
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  addTodo() {
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
      this.addTodo();
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
              placeholder="write a todo"
              className="todo-creater--content"
              type="text"
              ref="content"
            />
          </div>

          <div
            className="todo-creater-props todo-creater-deadline"
            onClick={() => this.refs.datePicker.toggle()}
          >
            <i className="fa fa-calendar-check-o date-picker--icon" aria-hidden="true" />
            <label>Deadline:</label>
            <DatePicker ref="datePicker" hideIcon={true} placeholder="YYYY-MM-DD" />
          </div>

          <div className="todo-creater-props todo-creater-repeat">
            <i className="fa fa-repeat" aria-hidden="true" />
            <label>Repeat:</label>
            <Select items={repeatItems} />
          </div>

          <div className="todo-creater-operation">
            <Button styleType="primary" onClick={this.addTodo}>
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
