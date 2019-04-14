import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { makeGravatarUrl } from '../../services/gravatar';
import { Storage, storageImage } from '../../services/storage';
import { LogoBan } from '../../components/commons/LogoBan/LogoBan';

import { Layout, Icon, Dropdown, Menu } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Nav.scss';

const { Header } = Layout;

// TODO remove
export const navHeight = 42;

class Nav extends Component<any> {
  state = {};

  avator: any;

  links = [
    { name: 'Dash', url: '/home' },
    { name: 'Task', url: '/task-board' },
    { name: 'Todo', url: '/todo' }
  ];

  onNewAvatarImageLoaded = (event: any) => {
    storageImage('avator', event.nativeEvent.target);
  };

  render() {
    const userName = this.props.user.username;
    const { user } = this.props;
    const avatarData = Storage.get('avator');

    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/profile">
            Signed in as <strong>{userName}</strong>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/setting">Setting</Link>
        </Menu.Item>

        <Menu.Item>
          <span onClick={this.props.actions.LOGOUT_REQUEST}>Logout</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className="app-header">
        <Link to="/task-board">
          <LogoBan white={true} />
        </Link>
        <div className="app-header-menu">
          <div>
            <NavLink to="/task-board" activeClassName="active">
              <Icon type="appstore-o" />
              Project
            </NavLink>

            <NavLink to="/todo" activeClassName="active">
              <FontAwesomeIcon icon="check-circle" />
              Todo
            </NavLink>
          </div>

          <div style={{ display: 'inline-block' }}>
            <Dropdown overlay={menu} placement="bottomRight">
              {avatarData ? (
                <img
                  alt=""
                  ref={ref => (this.avator = ref)}
                  className="nav-avatar"
                  src={`data:image/png;base64,${avatarData}`}
                />
              ) : (
                <img
                  alt=""
                  ref={ref => (this.avator = ref)}
                  className="nav-avatar"
                  crossOrigin="anonymous"
                  onLoad={this.onNewAvatarImageLoaded}
                  src={makeGravatarUrl(user.email)}
                />
              )}
            </Dropdown>
          </div>
        </div>
      </Header>
    );
  }
}

export default Nav;
