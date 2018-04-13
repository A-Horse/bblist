// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import R from 'ramda';
import MediaQuery from 'react-responsive';
import { makeGravatarUrl } from '../../services/gravatar';
import { Storage, storageImage } from '../../services/storage';
import { DropList } from '../../components/widget/DropList/DropList';
import ClickOutSide from '../../components/utils/ClickOutSide';
import { LogoBan } from '../../components/commons/LogoBan';
import { activeClassWhenMatchPrefix, testLoactionMatchPrefix } from '../../utils/route';

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

// TODO remove
export const navHeight = 42;

import './Nav.scss';

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

  renderLinkList() {
    return (
      <ul>
        <li>
          <Link to="/home">Dash</Link>
        </li>

        <li className={activeClassWhenMatchPrefix('/task-board')}>
          <Link to="/task-board">Task</Link>
        </li>

        <li className={activeClassWhenMatchPrefix('/todo')}>
          <Link to="/todo">Todo</Link>
        </li>
      </ul>
    );
  }

  findActivedLinkName() {
    const activedLink = R.find(R.compose(testLoactionMatchPrefix, R.prop('url')))(this.links);
    return activedLink ? activedLink.name : 'Octopus';
  }

  renderLinks() {
    return <div>{this.renderLinkList()}</div>;
  }

  render() {
    const userName = this.props.user.username;
    const { user } = this.props;
    const avatarData = Storage.get('avator');
    return (
      <Header>
        <LogoBan white={true} />
        <div className="nav-link-area">{this.renderLinks()}</div>
        <ClickOutSide
          className="avatar-area"
          onClickOutside={() => {
            this.state.avatarDropDownToggle && this.setState({ avatarDropDownToggle: false });
          }}
        >
          <div
            onClick={() =>
              this.setState({ avatarDropDownToggle: !this.state.avatarDropDownToggle })
            }
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
      </Header>
    );
  }
}

export default Nav;
