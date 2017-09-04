import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { makeGravatarUrl } from 'services/gravatar';
import { Storage, storageImage } from 'services/storage';
import { DropList } from 'components/widget/DropList';
import ClickOutSide from 'components/utils/ClickOutSide';

import { LogoBan } from 'components/commons/LogoBan';

export const navHeight = 42;

import 'style/nav.scss';

class Nav extends Component {
  constructor() {
    super();
    this.state = { dropDownToggle: false };
  }

  componentDidUpdate() {
    if (this.props.user && !Storage.get('avator')) {
      this.refs.avator.onload = () => {
        storageImage('avator', this.refs.avator);
      };
    }
  }

  render() {
    return (
      <nav className="nav">
        <LogoBan white={true} />

        <div className="nav-link-area">
          <Link to="/home">Dash</Link>
          <Link to="/task-wall">Task</Link>
          <Link to="/todo">Todo</Link>
          <Link to="/wiki">Wiki</Link>
          <Link to="/mind">Mind</Link>
        </div>
        {this.renderNavUser()}
      </nav>
    );
  }

  renderNavUser() {
    if (this.props.userIsFetching) {
      // TODO: 移到下面去
      return null;
    }
    console.log(this.props);

    const userName = this.props.user.username;
    return (
      <ClickOutSide
        className="avatar-area"
        onClickOutside={() => {
          this.state.dropDownToggle && this.setState({ dropDownToggle: false });
        }}
      >
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
            <li onClick={this.props.actions.logout}>logout</li>
          </ul>
        </DropList>
      </ClickOutSide>
    );
  }

  renderAvatar() {
    const { user } = this.props;
    const avatarData = Storage.get('avator');
    return !!avatarData
      ? <img
          ref="avator"
          className="nav-avatar"
          src={`data:image/png;base64,${avatarData}`}
          onClick={() => this.setState({ dropDownToggle: !this.state.dropDownToggle })}
        />
      : <img
          ref="avator"
          className="nav-avatar"
          crossOrigin="Anonymous"
          src={makeGravatarUrl(user.email)}
          onClick={() => this.setState({ dropDownToggle: !this.state.dropDownToggle })}
        />;
  }
}

export default Nav;
