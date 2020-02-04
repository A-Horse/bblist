import './NavAddOperation.scss';

import { Dropdown, Menu } from 'antd';
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { TaskCreator } from '../../../components/creators/TaskCreator/TaskCreator';
import { AppDropdown } from '../../../components/widget/Dropdown';
import { AppIcon } from '../../../components/widget/Icon';
import { AppMenu, AppMenuItem } from '../../../components/widget/Menu/Menu';
import { ProjectCreator } from '../../Project/ProjectCreator/ProjectCreator';

export class NavAddOperation extends Component<any> {
  state = {};

  render() {
    const menu = (
      <AppMenu className="nav-add-operation-menu" style={{ width: '156px' }}>
        <AppMenuItem>
          <ProjectCreator />
        </AppMenuItem>

        <AppMenuItem>
          <TaskCreator />
        </AppMenuItem>
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
