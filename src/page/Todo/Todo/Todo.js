// @flow
import React, { Component } from 'react';
import { CheckBox } from '../../../components/widget/CheckBox/CheckBox';
import { StarCheckBox } from '../../../components/widget/StarCheckBox/StarCheckBox';
import Textarea from 'react-textarea-autosize';
import { Select, Modal, Icon, Menu, Dropdown, Button, Form, Input, Row, Col, Checkbox } from 'antd';
import { timeout } from '../../../utils/timeout';
import moment from 'moment';
import R from 'ramda';
import { Map } from 'immutable';

import './Todo.scss';

const todoMetaHeight = 24;

import { repeatItems } from '../constants';

class Todo extends Component<
  {
    actions: any,
    todo: Map<Todo>
  },
  {
    editToggle: boolean
  }
> {
  state = {
    editToggle: false
  };

  updateEditingTodo() {
    const newTodo = { content: this.refs.content.value.trim() };
    this.setState({ editToggle: false });
    this.updateTodo(newTodo);
  }

  updateTodo(toPatchData) {
    const { todo } = this.props;
    const data = {
      id: todo.get('id'),
      ...toPatchData
    };
    this.props.actions.UPDATE_TODO_REQUEST(data);
  }

  onContendChanged(event) {
    event.preventDefault();
    this.updateTodo({ content: event.target.value.trim() });
  }

  removeTodo() {
    const { todo } = this.props;
    this.props.actions.DESTORY_TODO_REQUEST({
      id: todo.get('id')
    });
  }

  updateDone = (event: SyntheticEvent<Event>) => {
    this.updateTodo({ isDone: event.target.checked });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.todo !== nextProps.todo) {
      return true;
    }
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }

  render() {
    const { todo } = this.props;

    return (
      <div ref="main">
        <div className="todo--main">
          <Checkbox
            className="todo-done-checkbox"
            defaultChecked={todo.get('isDone')}
            onChange={this.updateDone}
          />
          <div
            style={{ display: !this.state.editToggle ? 'block' : 'none' }}
            className="todo--content"
          >
            {todo.get('content')}
            {todo.get('deadline') && (
              <div className="todo-deadline-label">
                <span>{new moment(todo.get('deadline')).format('MM-DD')}</span>
              </div>
            )}
          </div>

          <div className="todo-operation">
            <StarCheckBox
              defaultChecked={todo.get('isStar')}
              onChange={checked => {
                this.updateTodo({ isStar: checked });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
