// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoCreater from '../TodoCreater/TodoCreater';
import Todo from '../Todo/Todo';
import { Map, List } from 'immutable';

import { Layout, Menu, Icon, List as AntList, Button } from 'antd';
const { Header, Sider, Content } = Layout;

import './TodoList.scss';

export default class TodoList extends Component<
  {
    todoBoxId: string,
    actions: any,
    unDoneTodos: List<Todo[]>,
    doneTodos: List<Todo[]>
  },
  {
    toggleAll: boolean
  }
> {
  state = { toggleAll: false };

  // TODO move logic outside
  componentWillMount() {
    this.getTodoList(this.props, true);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.boxId !== this.props.match.params.boxId) {
      this.getTodoList(newProps);
    }
  }

  getTodoList(props, force) {
    const { todoBoxId } = props;
    if (force || todoBoxId !== this.props.todoBoxId) {
      this.props.actions.GET_TODOLIST_REQUEST({ todoBoxId });
    }
  }

  renderList(todos) {
    return todos.map(todo => (
      <Todo key={todo.get('id')} todo={todo} actions={this.props.actions} />
    ));
  }

  render() {
    return (
      <div className="todo-list">
        <div className="creater-container">
          <TodoCreater actions={this.props.actions} todoBoxId={this.props.todoBoxId} />
        </div>

        <div className="todos">
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

          <Button type="primary">Display completed task</Button>
          <div>
            <span
              className="remain-todo-toggle"
              onClick={() => this.setState({ toggleAll: !this.state.toggleAll })}
            >
              <i className="fa fa-check-circle" aria-hidden="true" />
              {!this.state.toggleAll ? 'show all' : 'hide done'}
            </span>
          </div>
          {this.state.toggleAll && (
            <div className="done">{this.renderList(this.props.doneTodos)}</div>
          )}
        </div>
      </div>
    );
  }
}
