// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TodoBoxCreater } from '../TodoBoxCreater/TodoBoxCreater';
import { Map } from 'immutable';

import { Layout, Menu, Icon, List } from 'antd';
const { Header, Sider, Content } = Layout;

import './TodoBoxs.less';

class TodoBoxs extends Component<{
  actions: Object,
  match: any,
  todoBoxs: Map<TodoBox>[]
}> {
  componentWillMount() {
    this.props.actions.GET_TODOBOXS_REQUEST();
  }

  render() {
    return (
      <ul className="todo-boxs">
        <div className="todo-box-creater-container">
          <TodoBoxCreater actions={this.props.actions} />
        </div>
        <div className="todo-box-group-list">
          <Menu defaultSelectedKeys={['1']}>
            {this.props.todoBoxs.map(todoBox => {
              return (
                <Menu.Item key={todoBox.get('id')}>
                  <Link to={`/todo/${todoBox.get('id')}`}>
                    <i className="fa fa-archive" aria-hidden="true" />
                    <span>{todoBox.get('name')}</span>
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
      </ul>
    );
  }
}

export default TodoBoxs;
