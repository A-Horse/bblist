import './NavAddOperation.scss';

import { Dropdown, Menu } from 'antd';
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { TaskCreator } from '../../../components/creators/TaskCreator/TaskCreator';
import { AppIcon } from '../../../widget/Icon';
import { AppMenu, AppMenuItem } from '../../../widget/Menu/Menu';
import { ProjectCreator } from '../../Project/ProjectCreator/ProjectCreator';

export class NavAddOperation extends Component<any> {
  state = {};

  render() {
    return (
      <ProjectCreator />
    );
  }
}
