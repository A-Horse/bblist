// @flow
import React, { Component } from 'react';
import { TodoCreater } from '../TodoCreater/TodoCreater';
import Todo from '../Todo/Todo';
import { List } from 'immutable';

import { Layout, Menu, Icon, List as AntList, Button } from 'antd';
const { Header, Sider, Content } = Layout;

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

  // TODO move logic outside
  componentWillMount() {
    this.getTodoList(this.props, true);
  }

  componentWillReceiveProps(newProps: any) {
    if (newProps.match.params.boxId !== this.props.match.params.boxId) {
      this.getTodoList(newProps);
    }
  }

  getTodoList(props: Props, force?: boolean) {
    const { todoBoxId } = props;
    if (force || todoBoxId !== this.props.todoBoxId) {
      this.props.actions.GET_TODOLIST_REQUEST({ todoBoxId });
    }
  }

  createTodo = () => {};

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
