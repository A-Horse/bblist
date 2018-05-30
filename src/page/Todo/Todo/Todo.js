// @flow
import React, { Component } from 'react';
import { StarCheckBox } from '../../../components/widget/StarCheckBox/StarCheckBox';
import { Checkbox } from 'antd';
import moment from 'moment';
import { Map } from 'immutable';
import { Row, Col } from 'antd';

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
        <Row>
          <Col span={2}>
            <Checkbox className="todo-done-checkbox" defaultChecked={todo.get('isDone')} />
          </Col>
          <Col span={20}>
            {todo.get('content')}
            {todo.get('deadline') && (
              <div className="todo-deadline-label">
                <span>{new moment(todo.get('deadline')).format('MM-DD')}</span>
              </div>
            )}
          </Col>

          <Col span={2}>
            <div className="todo-operation">
              <StarCheckBox
                defaultChecked={todo.get('isStar')}
                onChange={checked => {
                  this.updateTodo({ isStar: checked });
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
