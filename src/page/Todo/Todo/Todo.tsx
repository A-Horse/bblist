import React, { Component } from 'react';
import { StarCheckBox } from '../../../components/widget/StarCheckBox/StarCheckBox';
import { Checkbox } from 'antd';
import moment from 'moment';
import { Tag } from 'antd';

import './Todo.scss';

export class Todo extends Component<any, any> {
  state = {
    editToggle: false
  };

  updateTodo(updatedPart: any) {
    const { todo } = this.props;
    const data = {
      id: todo.get('id'),
      ...updatedPart
    };
    this.props.actions.UPDATE_TODO_REQUEST(data);
  }

  updateDone = (event: any) => {
    this.updateTodo({ isDone: event.target.checked });
  };

  shouldComponentUpdate(nextProps: any, nextState: any) {
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
              {moment(todo.get('deadline')).format('MM-DD')}
            </Tag>
          )}
        </div>

        <div className="todo-operation">
          <StarCheckBox
            defaultChecked={todo.get('isStar')}
            onChange={(checked: boolean) => {
              this.updateTodo({ isStar: checked });
            }}
          />
        </div>
      </div>
    );
  }
}
