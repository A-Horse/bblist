// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { makeGravatarUrl } from 'services/gravatar';
import { Storage, storageImage } from 'services/storage';
import { DropList } from 'components/widget/DropList/DropList';
import ClickOutSide from 'components/utils/ClickOutSide';
import { LogoBan } from 'components/commons/LogoBan';
import { activeClassWhenMatchPrefix } from '../../utils/route';

export const navHeight = 42;

import './Nav.scss';

class Nav extends Component {
  state = { dropDownToggle: false };

  componentDidUpdate() {
    if (this.props.user && !Storage.get('avator')) {
      this.refs.avator.onload = () => {
        storageImage('avator', this.refs.avator);
      };
    }
  }

  renderLinkList() {
    return (
      <ul>
        <li>
          <Link to="/home">Dash</Link>
        </li>

        <li>
          <Link to="/task-board" className={activeClassWhenMatchPrefix('/task-board')}>
            Task
          </Link>
        </li>

        <li>
          <Link to="/todo" className={activeClassWhenMatchPrefix('/todo')}>
            Todo
          </Link>
        </li>

        <li>
          <Link to="/wiki" className={activeClassWhenMatchPrefix('/wiki')}>
            Wiki
          </Link>
        </li>

        <li>
          <Link to="/mind" className={activeClassWhenMatchPrefix('/mind')}>
            Mind
          </Link>
        </li>
      </ul>
    );
  }

  renderLinks() {
    return (
      <div>
        <MediaQuery minDeviceWidth={600}>{this.renderLinkList()}</MediaQuery>
        <MediaQuery maxDeviceWidth={600}>
          <div>{this.renderLinkList()}</div>
          <DropList toggle={true}>{this.renderLinkList()}</DropList>
        </MediaQuery>
      </div>
    );
  }

  renderNavUser() {
    if (this.props.identifyFetching) {
      return null;
    }
    const userName = this.props.user.get('username');
    return (
      <ClickOutSide
        className="avatar-area"
        onClickOutside={() => {
          this.state.dropDownToggle && this.setState({ dropDownToggle: false });
        }}
      >
        <MediaQuery minDeviceWidth={600}>
          <span className="nav-username">{userName}</span>
        </MediaQuery>

        {this.renderAvatar()}
        <DropList toggle={this.state.dropDownToggle}>
          <ul>
            <li>
              Signed in as <strong>{userName}</strong>
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
        </DropList>
      </ClickOutSide>
    );
  }

  renderAvatar() {
    const { user } = this.props;
    const avatarData = Storage.get('avator');
    return avatarData ? (
      <img
        ref="avator"
        className="nav-avatar"
        src={`data:image/png;base64,${avatarData}`}
        onClick={() => this.setState({ dropDownToggle: !this.state.dropDownToggle })}
      />
    ) : (
      <img
        ref="avator"
        className="nav-avatar"
        crossOrigin="Anonymous"
        src={makeGravatarUrl(user.get('email'))}
        onClick={() => this.setState({ dropDownToggle: !this.state.dropDownToggle })}
      />
    );
  }

  render() {
    return (
      <nav className="nav">
        <LogoBan white={true} />
        <div className="nav-link-area">{this.renderLinks()}</div>
        {this.renderNavUser()}
      </nav>
    );
  }
}

export default Nav;
