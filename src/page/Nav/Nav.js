// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import R from 'ramda';
import { makeGravatarUrl } from '../../services/gravatar';
import { Storage, storageImage } from '../../services/storage';
import { DropList } from '../../components/widget/DropList/DropList';
import ClickOutSide from '../../components/utils/ClickOutSide';
import { LogoBan } from '../../components/commons/LogoBan/LogoBan';
import { testLoactionMatchPrefix } from '../../utils/route';

import { Layout, Menu } from 'antd';
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

  findActivedLinkName() {
    const activedLink = R.find(R.compose(testLoactionMatchPrefix, R.prop('url')))(this.links);
    return activedLink ? activedLink.name : 'Octopus';
  }

  renderLinks() {
    return <div>{this.renderLinkList()}</div>;
  }

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
              onLoad={() => storageImage('avator', this.avator)}
              src={makeGravatarUrl(user.email)}
            />
          )}
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
    return (
      <Header className="app-header">
        <LogoBan white={true} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">
            <Link to="/home">Dash</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/task-board">Task</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/todo">Todo</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default Nav;
