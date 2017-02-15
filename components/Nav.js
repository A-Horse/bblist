import React, {Component} from 'react';
import R from 'fw-ramda';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {makeGravatarUrl} from 'services/gravatar';
import {Storage, storageImage} from 'services/storage';
import {DropList} from './widget/DropList';
import ClickOutSide from 'components/utils/ClickOutSide';

import {LogoBan} from 'components/commons/LogoBan';

export const navHeight = 42;

import 'style/nav.scss';

class Nav extends Component {
  constructor() {
    super();
    this.state = {dropDownToggle: false};
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
      <nav className='nav'>
        <LogoBan/>

        <div className='nav-link-area'>
          <Link to='/dash' activeClassName='nav-link__active'>Dash</Link>
          <Link to='/task-wall' activeClassName='nav-link__active'>Task</Link>
          <Link to='/todo' activeClassName='nav-link__active'>Todo</Link>
          <Link to='/idea' activeClassName='nav-link__active'>Idea</Link>
        </div>
        {this.renderNavUser()}
      </nav>
    );
  }

  renderNavUser() {
    // TODO: loading
    const userName = this.props.user.username;
    return (
      <ClickOutSide className='avatar-area' onClickOutside={() => {this.state.dropDownToggle && this.setState({dropDownToggle: false})}}>
        {this.renderAvatar()}
        <DropList toggle={this.state.dropDownToggle}>
          <ul>
            <section>
              <li>Signed in as <strong>{userName}</strong></li>
            </section>
            <section>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
            </section>
            <section>
              <li>
                <Link to='/setting'>
                  setting
                </Link>
              </li>
              <li onClick={this.props.logout}>logout</li>
            </section>
          </ul>
        </DropList>
      </ClickOutSide>
    );
  }

  renderAvatar() {
    const {user} = this.props;
    const avatarData = Storage.get('avator');
    return !!avatarData ? (
      <img ref='avator' className='nav-avatar'
           src={`data:image/png;base64,${avatarData}`}
           onClick={() => this.setState({dropDownToggle: !this.state.dropDownToggle})}/>
    ) : (
      <img ref='avator' className='nav-avatar' crossOrigin='Anonymous'
           src={makeGravatarUrl(user.email)}
           onClick={() => this.setState({dropDownToggle: !this.state.dropDownToggle})}/>
    );
  }
}

export default Nav;

