// @flow
import React, { Component } from 'react';
import { TodoCreater } from '../TodoCreater/TodoCreater';
import { Todo } from '../Todo/Todo';
import { List } from 'immutable';
import { List as AntList } from 'antd';

import './TodoPageContent.less';

interface Props {
  todoBoxId: string;
  actions: any;
  match: any;
  unDoneTodos: List<Todo[]>;
  doneTodos: List<Todo[]>;
}

export class TodoPageContent extends Component<
  Props,
  {
    toggleAll: boolean
  }
> {
  state = { toggleAll: false };

  componentWillMount() {
    this.getTodoList();
  }

  componentWillReceiveProps(newProps: any) {}

  getTodoList() {
    const { todoBoxId } = this.props;
    this.props.actions.GET_TODOLIST_REQUEST({ todoBoxId });
  }

  createTodo = (todo: { content: string, deadline: number | null }) => {
    this.props.actions.ADD_TODO_REQUEST(todo);
  };

  render() {
    return (
      <div className="todo-list">
        <div className="creater-container">
          <TodoCreater submit={this.createTodo} />
        </div>

        {this.props.unDoneTodos && (
          <AntList
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={this.props.unDoneTodos.toArray()}
            renderItem={todo => (
              <AntList.Item>
                <Todo key={todo.get('id')} todo={todo} actions={this.props.actions} />
              </AntList.Item>
            )}
          />
        )}

        <span
          className="remain-todo-toggle"
          onClick={() => this.setState({ toggleAll: !this.state.toggleAll })}
        >
          <i className="fa fa-check-circle" aria-hidden="true" />
          {!this.state.toggleAll ? 'show all' : 'hide done'}
        </span>

        {this.state.toggleAll && (
          <AntList
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={this.props.doneTodos.toArray()}
            renderItem={todo => (
              <AntList.Item>
                <Todo key={todo.get('id')} todo={todo} actions={this.props.actions} />
              </AntList.Item>
            )}
          />
        )}
      </div>
    );
  }
}
