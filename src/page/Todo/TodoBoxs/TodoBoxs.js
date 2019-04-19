  //
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TodoBoxCreater } from '../TodoBoxCreater/TodoBoxCreater';
import { Map } from 'immutable';

import { Menu, Icon } from 'antd';

import './TodoBoxs.scss';

class TodoBoxs extends Component {
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
                    <Icon type="check-square-o" />
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
