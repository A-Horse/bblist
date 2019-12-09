import './TodoPageContent.scss';

import { List as AntList } from 'antd';
import React, { Component } from 'react';

import { Todo } from '../Todo/Todo';

export class TodoPageContent extends Component<any> {
  state = { toggleAll: false };

  componentWillMount() {
    this.getTodoList();
  }

  getTodoList() {
    const { todoBoxId } = this.props;
    this.props.actions.GET_TODOLIST_REQUEST({ todoBoxId });
  }

  createTodo = (todo: any) => {
    this.props.actions.ADD_TODO_REQUEST(todo);
  };

  render() {
    return (
      <div className="todo-list">
        {this.props.unDoneTodos && (
          <AntList
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={this.props.unDoneTodos.toArray()}
            renderItem={(todo: any) => (
              <AntList.Item>
                <Todo key={todo.get('id')} todo={todo} actions={this.props.actions} />
              </AntList.Item>
            )}
          />
        )}

        <span className="remain-todo-toggle" onClick={() => this.setState({ toggleAll: !this.state.toggleAll })}>
          <i className="fa fa-check-circle" aria-hidden="true" />
          {!this.state.toggleAll ? 'show all' : 'hide done'}
        </span>

        {this.state.toggleAll && (
          <AntList
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={this.props.doneTodos.toArray()}
            renderItem={(todo: any) => (
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
