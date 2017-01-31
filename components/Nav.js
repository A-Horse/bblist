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

const styles = {
  menuLi: {
    display: 'block',
    backgroundColor: 'white',
    textAlign: 'right',
    border: 'none',
    padding: '0'
  }
};

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

  buildLinkClassName(keyPath) {
    const path = R.second(this.props.path.split('/'));
    return (path === keyPath) ? 'nav-link nav-link__active' : 'nav-link';
  }
  
  render() {
    return (
      <nav className='nav'>
        <LogoBan/>

        <div className='nav-link-area'>
          <Link to='/dash' className={this.buildLinkClassName('dash')}>Dash</Link>
          <Link to='/task-wall' className={this.buildLinkClassName('task-wall')}>Task</Link>
          <Link to='/todo' className={this.buildLinkClassName('todo')}>Todo</Link>
          <Link to='/idea' className={this.buildLinkClassName('idea')}>Idea</Link>
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

