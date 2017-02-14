import React, {Component} from 'react';
import R from 'fw-ramda';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {makeGravatarUrl} from 'services/gravatar';
import {Storage, storageImage} from 'services/storage';
import {DropList} from './widget/DropList';


import {LogoBan} from 'components/commons/LogoBan';

export const navHeight = 42;

import 'style/nav.scss';

class Nav extends Component {
  constructor() {
    super();
    this.state = {userMenuToggle: false};
  }

  componentWillMount() {
    this.props.authUser();
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
    return (
      <div className='avatar-area'>
        {this.renderAvatar()}
        <DropList toggle={this.state.userMenuToggle}>
          <ul>
            <Link to='/profile' onClick={() => {this.setState({userMenuToggle: false})}}>Profile</Link>
            <button onClick={this.props.onLogout}>Log out</button>
          </ul>
        </DropList>
      </div>
    );
  }

  renderAvatar() {
    const {user} = this.props;
    const avatarData = Storage.get('avator');
    return !!avatarData ? (
      <img ref='avator' className='nav-avatar'
           src={`data:image/png;base64,${avatarData}`}
           onClick={() => {this.setState({userMenuToggle: !this.state.userMenuToggle})}}/>
    ) : (
      <img ref='avator' className='nav-avatar' crossOrigin='Anonymous'
           src={makeGravatarUrl(user.email)}
           onClick={() => {this.setState({userMenuToggle: !this.state.userMenuToggle})}}/>
    );
  }
}

export default Nav;

