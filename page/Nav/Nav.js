import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { makeGravatarUrl } from 'services/gravatar';
import { Storage, storageImage } from 'services/storage';
import { DropList } from 'components/widget/DropList/DropList';
import ClickOutSide from 'components/utils/ClickOutSide';
import { LogoBan } from 'components/commons/LogoBan';
import { activeClassWhenMatchPrefix } from '../../utils/route';

export const navHeight = 42;

import './Nav.scss';

type State = {
  avatarDropDownToggle: boolean
};

class Nav extends Component {
  static propTypes = {
    identifyFetching: PropTypes.bool,
    user: PropTypes.object
  };

  state = { avatarDropDownToggle: false, smallDeviceNavLinkToggle: false };

  links = [
    { name: 'Dash', url: '/home' },
    { name: 'Task', url: '/task-board' },
    { name: 'Wiki', url: '/wiki' },
    { name: 'Mind', url: '/mind' }
  ];

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

        <li className={activeClassWhenMatchPrefix('/task-board')}>
          <Link to="/task-board">Task</Link>
        </li>

        <li className={activeClassWhenMatchPrefix('/todo')}>
          <Link to="/todo">Todo</Link>
        </li>

        <li className={activeClassWhenMatchPrefix('/wiki')}>
          <Link to="/wiki">Wiki</Link>
        </li>

        <li className={activeClassWhenMatchPrefix('/mind')}>
          <Link to="/mind">Mind</Link>
        </li>
      </ul>
    );
  }

  renderLinks() {
    return (
      <div>
        <MediaQuery className="nav-links__large-device" minDeviceWidth={600}>
          {this.renderLinkList()}
        </MediaQuery>
        <MediaQuery className="nav-links__small-device" maxDeviceWidth={600}>
          <div
            className="nav-active-link__small-device"
            onClick={event => {
              event.stopPropagation();
              this.setState({
                smallDeviceNavLinkToggle: !this.state.smallDeviceNavLinkToggle
              });
            }}
          >
            {this.renderLinkList()}
            <i className="fa fa-angle-down" aria-hidden="true" />
          </div>

          <DropList toggle={this.state.smallDeviceNavLinkToggle}>
            <ClickOutSide
              onClickOutside={event => {
                event.stopPropagation();
                this.setState({ smallDeviceNavLinkToggle: false });
              }}
            >
              {this.renderLinkList()}
            </ClickOutSide>
          </DropList>
        </MediaQuery>
      </div>
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
        onClick={() => this.setState({ avatarDropDownToggle: !this.state.avatarDropDownToggle })}
      />
    ) : (
      <img
        ref="avator"
        className="nav-avatar"
        crossOrigin="Anonymous"
        src={makeGravatarUrl(user.get('email'))}
        onClick={() => this.setState({ avatarDropDownToggle: !this.state.avatarDropDownToggle })}
      />
    );
  }

  render() {
    const userName = this.props.user.get('username');
    return (
      <nav className="nav">
        <LogoBan white={true} />
        <div className="nav-link-area">{this.renderLinks()}</div>
        {this.props.identifyFetching ? (
          <ClickOutSide
            className="avatar-area"
            onClickOutside={() => {
              this.state.avatarDropDownToggle && this.setState({ avatarDropDownToggle: false });
            }}
          >
            <MediaQuery minDeviceWidth={600}>
              <span className="nav-username">{userName}</span>
            </MediaQuery>

            {this.renderAvatar()}
            <DropList toggle={this.state.avatarDropDownToggle}>
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
        ) : null}
      </nav>
    );
  }
}

export default Nav;
