// @flow
import React, { Component } from 'react';
import { StarCheckBox } from '../../../components/widget/StarCheckBox/StarCheckBox';
import { Checkbox } from 'antd';
import moment from 'moment';
import { Map } from 'immutable';
import { Row, Col, Tag } from 'antd';

import './Todo.less';

interface Props {
  actions: any;
  todo: Map<Todo>;
}

interface State {
  editToggle: boolean;
}

export class Todo extends Component<Props, State> {
  state = {
    editToggle: false
  };

  updateTodo(updatedPart: Object) {
    const { todo } = this.props;
    const data = {
      id: todo.get('id'),
      ...updatedPart
    };
    this.props.actions.UPDATE_TODO_REQUEST(data);
  }

  updateDone = (event: SyntheticEvent<Event>) => {
    this.updateTodo({ isDone: event.target.checked });
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
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
