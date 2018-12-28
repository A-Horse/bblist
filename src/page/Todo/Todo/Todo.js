//
import React, { Component } from 'react';
import { StarCheckBox } from '../../../components/widget/StarCheckBox/StarCheckBox';
import { Checkbox } from 'antd';
import moment from 'moment';
import { Map } from 'immutable';
import { Row, Col, Tag } from 'antd';

import './Todo.scss';

export class Todo extends Component {
  state = {
    editToggle: false
  };

  updateTodo(updatedPart) {
    const { todo } = this.props;
    const data = {
      id: todo.get('id'),
      ...updatedPart
    };
    this.props.actions.UPDATE_TODO_REQUEST(data);
  }

  updateDone = event => {
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
      <div className="todo-item">
        <Checkbox
          className="todo-done-checkbox"
          onChange={this.updateDone}
          defaultChecked={todo.get('isDone')}
        />
        <div className="todo-item-main">
          {todo.get('content')}
          {todo.get('deadline') && (
            <Tag color="magenta" style={{ marginLeft: '10px' }}>
              {new moment(todo.get('deadline')).format('MM-DD')}
            </Tag>
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
    );
  }
}
