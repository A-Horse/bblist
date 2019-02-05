import React, { Component } from 'react';
import { StarCheckBox } from '../../../components/widget/StarCheckBox/StarCheckBox';
import { Checkbox } from 'antd';
import moment from 'moment';
import { Tag } from 'antd';

import './Todo.scss';

export class Todo extends Component<any> {

  updateTodo(updatedPart: any) {
    const { todo } = this.props;
    const data = {
      ...todo.toJS(),
      ...updatedPart
    };
    this.props.actions.UPDATE_TODO_REQUEST(data);
  }

  updateDone = (event: any) => {
    this.updateTodo({ status: event.target.checked ? 'DONE' : 'ACTIVE' });
  };

  render() {
    const { todo } = this.props;

    return (
      <div className="todo-item">
        <Checkbox
          className="todo-done-checkbox"
          onChange={this.updateDone}
          defaultChecked={todo.get('status') === 'DONE'}
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
