import React, {Component} from 'react';
import Radium from 'radium';
import R from 'fw-ramda';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {makeGravatarUrl} from 'services/gravatar';
import {Storage, storageImage} from 'services/storage';
import {authUser} from 'actions/login';
import {spawnMixinRender} from 'style/theme-render';
import {ThemeConst} from 'style/theme';
import {DropList} from './widget/DropList';
import {removeCachedData} from 'utils/auth';
import {logout} from 'actions/logout';
import {LogoBan} from 'components/commons/LogoBan';

export const navHeight = 42;

import 'style/nav.scss';

const styles = {
  userMenu: {
    position: 'absolute',
    right: '0',
    marginRight: '0.5rem',
    marginTop: '0.5rem',
    border: `1px solid ${ThemeConst.deepDark}`
  },
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
    let {dispatch} = this.props;    
    dispatch(authUser());
  }

  componentDidMount() {
    
  }

  componentDidUpdate() {
    if( this.props.user && !Storage.get('avator') ){
      this.refs.avator.onload = () => {
        storageImage('avator', this.refs.avator);
      };
    }
  }

  onLogout() {
    const {dispatch} = this.props;
    return dispatch(logout()).then(removeCachedData());
  }

  buildLinkClassName(keyPath) {
    const path = R.second(this.props.path.split('/'));
    return (path === keyPath) ? 'nav-link nav-link__active' : 'nav-link';
  }
  
  render() {
    return (
      <nav className='nav'>
        <LogoBan/>

        <div className='nav-link' className='link-area'>
          <Link to='/home' className={this.buildLinkClassName('home')}>Home</Link>
          <Link to='/task-wall' className={this.buildLinkClassName('task-wall')}>Task</Link>
          <Link to='/todo' className={this.buildLinkClassName('todo')}>Todo</Link>
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
          <ul style={styles.userMenu}>
            <Link style={styles.menuLi} to='/profile' onClick={() => {this.setState({userMenuToggle: false})}}>Profile</Link>
            <button style={styles.menuLi} onClick={this.onLogout.bind(this)}>Log out</button>
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.loginedUser,
    path: state.routing.locationBeforeTransitions.pathname
  };
};

export default connect(mapStateToProps)(Nav);

