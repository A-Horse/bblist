import './TodoBoxs.scss';

import { Icon, Menu } from 'antd';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AppIcon } from '../../../components/widget/Icon';
import { TodoBoxCreater } from '../TodoBoxCreater/TodoBoxCreater';

class TodoBoxs extends Component<any> {
  componentWillMount() {
    this.props.actions.GET_TODOBOXS_REQUEST();
  }

  render() {
    return (
      <ul className="todo-boxs">
        <div className="todo-box-group-list">
          <Menu defaultSelectedKeys={['@all']}>
            {this.props.todoBoxs.map((todoBox: any) => {
              return (
                <Menu.Item className="todo-box-item" key={todoBox.get('id')}>
                  <Link to={`/todo/${todoBox.get('id')}`}>
                    <div className="todo-box-item-icon-wrapper">
                      <AppIcon size="lg" className="todo-box-item-icon" icon={todoBox.get('iconName')} color="#999" />
                    </div>
                    <span>{todoBox.get('name')}</span>
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </div>

        <div className="todo-box-creater-container">
          <TodoBoxCreater actions={this.props.actions} />
        </div>
      </ul>
    );
  }
}

export default TodoBoxs;
