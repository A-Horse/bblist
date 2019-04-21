import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Dropdown, Menu } from 'antd';
import { AppIcon } from '../../../components/widget/Icon';
import { AppDropdown } from '../../../components/widget/Dropdown';
import { AppMenu } from '../../../components/widget/Menu/Menu';

import './NavAddOperation.scss';
import { TaskBoardCreater } from '../../Task/TaskBoardCreater/TaskBoardCreater';
import { TaskCreator } from '../../../components/creators/TaskCreator/TaskCreator';

export class NavAddOperation extends Component<any> {
  state = {};

  render() {
    const menu = (
      <AppMenu className="nav-add-operation-menu" style={{ width: '156px' }}>
        <AppMenu.Item>
          <TaskBoardCreater />
        </AppMenu.Item>

        <AppMenu.Item>
          <TaskCreator />
        </AppMenu.Item>
      </AppMenu>
    );
    return (
      <AppDropdown
        className="nav-operation-dropdown"
        overlay={menu}
        placement="bottomCenter"
        trigger={['click']}
      >
        <AppIcon icon="plus-circle" color="white" size="lg" />
      </AppDropdown>
    );
  }
}
