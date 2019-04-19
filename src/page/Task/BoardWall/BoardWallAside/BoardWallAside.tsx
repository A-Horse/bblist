import React, { Component } from 'react';

import { AppMenu } from '../../../../components/widget/Menu/Menu';
import { Icon } from 'antd';

interface Props {}

export class BoardWallAside extends Component<Props> {
  componentWillMount() {}

  render() {
    return (
      <AppMenu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={'vertical'}
        theme={'light'}
      >
        <AppMenu.Item key="1">
          <Icon type="mail" />
          Navigation One
        </AppMenu.Item>
        <AppMenu.Item key="2">
          <Icon type="calendar" />
          Navigation Two
        </AppMenu.Item>
      </AppMenu>
    );
  }
}
