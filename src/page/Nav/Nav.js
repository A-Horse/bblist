// @flow
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { makeGravatarUrl } from '../../services/gravatar';
import { Storage, storageImage } from '../../services/storage';
import { LogoBan } from '../../components/commons/LogoBan/LogoBan';

import { Layout, Icon, Dropdown, Menu } from 'antd';
const { Header } = Layout;

// TODO remove
export const navHeight = 42;

import './Nav.less';

class Nav extends Component<
  {
    user: UserData,
    actions: any
  },
  { avatarDropDownToggle: boolean, smallDeviceNavLinkToggle: boolean }
> {
  state = { avatarDropDownToggle: false, smallDeviceNavLinkToggle: false };

  links = [
    { name: 'Dash', url: '/home' },
    { name: 'Task', url: '/task-board' },
    { name: 'Todo', url: '/todo' }
  ];

  onNewAvatarImageLoaded = (event: SyntheticEvent<any>) => {
    storageImage('avator', event.nativeEvent.target);
  };

  comment() {
    return (
      <ClickOutSide
        className="avatar-area"
        onClickOutside={() => {
          this.state.avatarDropDownToggle && this.setState({ avatarDropDownToggle: false });
        }}
      >
        <div
          onClick={() => this.setState({ avatarDropDownToggle: !this.state.avatarDropDownToggle })}
        >
          <span className="nav-username">{userName}</span>

          <i
            className={`fa fa-angle-down ${this.state.avatarDropDownToggle ? ' toggle' : ''}`}
            aria-hidden="true"
          />
        </div>

        <DropList className="nav-avatar-drop-down" toggle={this.state.avatarDropDownToggle}>
          <ClickOutSide
            onClickOutside={() => {
              this.setState({ avatarDropDownToggle: false });
            }}
            onClick={() => {
              this.setState({ avatarDropDownToggle: false });
            }}
          >
            <ul>
              <li>
                <Link to="/profile">
                  Signed in as <strong>{userName}</strong>
                </Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/setting">setting</Link>
              </li>
              <li className="logout-button" onClick={this.props.actions.LOGOUT_REQUEST}>
                logout
              </li>
            </ul>
          </ClickOutSide>
        </DropList>
      </ClickOutSide>
    );
  }

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
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
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
              <Icon type="check-square" />
              Todo
            </NavLink>
          </div>

          <div style={{ display: 'inline-block' }}>
            <Dropdown overlay={menu} placement="bottomRight">
              {avatarData ? (
                <img
                  ref={ref => (this.avator = ref)}
                  className="nav-avatar"
                  src={`data:image/png;base64,${avatarData}`}
                />
              ) : (
                <img
                  ref={ref => (this.avator = ref)}
                  className="nav-avatar"
                  crossOrigin="Anonymous"
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
