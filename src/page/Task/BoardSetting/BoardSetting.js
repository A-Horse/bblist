// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import Infomation from './Infomation/Infomation';
import Operation from './Operation/Operation';
import Preference from './Preference/Preference';
import Participant from './Participant/Participant';

import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import './BoardSetting.scss';

export class BoardSetting extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    board: PropTypes.object,
    loginedUser: PropTypes.object
  };
  render() {
    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key={1}>
              <Link to={`infomation`}>Infomation</Link>
            </Menu.Item>
            <Menu.Item key={2}>
              <Link to={`preference`}>Preference</Link>
            </Menu.Item>
            <Menu.Item key={3}>
              <Link to={`operation`}>Operation</Link>
            </Menu.Item>
            <Menu.Item key={4}>
              <Link to={`participant`}>Participant</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <div className="board-setting-panel">
              <Switch>
                <Route
                  path="/task-board/:id/setting/infomation"
                  render={() => <Infomation {...this.props} />}
                />
                <Route
                  path="/task-board/:boardId/setting/participant"
                  render={props => <Participant {...this.props} {...props} />}
                />
                <Route
                  path="/task-board/:id/setting/preference"
                  render={() => <Preference {...this.props} />}
                />
                <Route
                  path="/task-board/:id/setting/operation"
                  render={() => <Operation {...this.props} />}
                />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BoardSetting;
