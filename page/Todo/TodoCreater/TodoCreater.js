import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createTodo, getTodoList } from 'actions/todo/todos';
import { IconAdd } from 'services/image-icon';
import { Button } from 'components/widget/Button';
import DatePicker from 'components/DatePicker/DatePicker';
import { Select } from 'components/widget/Select';
import Textarea from 'react-textarea-autosize';
import { isEnterKey } from 'utils/keyboard';

import ClickOutSide from 'components/utils/ClickOutSide';

import './TodoCreater.scss';

import { repeatItems } from '../constants';

class TodoCreater extends Component {
  constructor() {
    super();
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
    const { dispatch } = this.props;
    const data = {
      content: this.refs.content.value.trim(),
      deadline: this.refs.datePicker.value ? this.refs.datePicker.value.getTime() : null
      //label: this.refs.label.trim().split(';')
    };
    return dispatch(createTodo(data)).then(() => {
      this.close();
      return dispatch(getTodoList(this.props.wallId));
    });
  }

  toggle() {
    console.log('ssssssssss');

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
    if (this.state.toggle) return this.renderCreater();
    return this.renderToggle();
  }

  renderToggle() {
    return (
      <div className="todo-creater--toggle" onClick={this.toggle}>
        <i className="fa fa-plus" aria-hidden="true" />
        <span className="toggle-text">Add Todo</span>
      </div>
    );
  }

  renderCreater() {
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
            <Select items={repeatItems} />
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

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(TodoCreater);
