import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import {makeGravatarUrl} from '../services/gravatar';
import {Storage} from '../services/storage';
import {authUser} from '../actions/login';
import Radium from 'radium';
import R from 'fw-ramda';
import {spawnThemeRender} from '../style/theme-render';
import {ThemeConst} from '../style/theme';
import {LightIcon} from '../services/svg-icons';
import {DropMenu} from './widget/DropMenu';
import {clearJWT} from '../utils/auth';

const styles = {
  headerStyle: {
    position: 'relative',
    width: '100%',
    padding: '6px 8px',
    boxSizing: 'border-box',
    borderBottom: `1px solid ${ThemeConst.deepDark}`
  },
  logoArea: {
    display: 'inline-block',
    textDecoration: 'none',
    float: 'left',
    marginLeft: '10px',
    color: 'black',
    fontWeight: '900'
  },
  logoIcon: {
    height: '1rem',
    width: '1rem',
    verticalAlign: 'middle',
    marginTop: '-3px'
  },
  linkArea: {
    display: 'inline-block',
    float: 'left',
    marginLeft: '2rem'
  },
  userArea: {
    display: 'inline-block',
    float: 'right'
  },
  userAvatar: {
    height: '1.7rem',
    width: '1.7rem',
    borderRadius: '50%',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  linkStyle: {
    textDecoration: 'none',
    float: 'left',
    marginLeft: '10px',
    color: ThemeConst.primeText
  },
  activeLink: {
    color: ThemeConst.mainColor,
    fontWeight: '900'
  },
  floatRight: {
    float: 'right'
  },
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

const themeRender = spawnThemeRender(styles);
themeRender('userMenu', 'lightBackground', 'boxPadding', 'smallRadius');

@Radium
class Nav extends Component {
  constructor() {
    super();
    this.state = {userMenuToggle: false};
  }

  componentWillMount() {
    let {dispatch} = this.props;    
    dispatch(authUser());
  }

  activelyLink(linkStyle) {
    return Object.assign({}, styles.linkStyle, styles.activeLink);
  }

  logout() {
    clearJWT();
  }
  
  render() {
    const userCell = this.renderUserCell();
    const path = R.second(this.props.path.split('/'));
    
    return (
      <header style={styles.headerStyle} className="clearfix">
        <div style={styles.logoArea} style={styles.logoArea}>
          <LightIcon style={styles.logoIcon} />
          <span>LiGHT</span>
        </div>
        <div style={styles.linkArea}>
          <Link to="/" style={styles.linkStyle}>Home</Link>
          <Link to="/task-wall" style={path === 'task-wall' ? this.activelyLink(styles.linkStyle) : styles.linkStyle}>Task</Link>
          <Link to="/idea" style={styles.linkStyle}>Idea</Link>
        </div>
        
        {userCell}
      </header>
    )
  }

  renderUserCell() {
    const user = this.props.user;
    const cachedUsername = Storage.get('cachedUsername');

    if( cachedUsername && user ){
      return (
        <div style={styles.userArea}>
          <img style={styles.userAvatar} src={makeGravatarUrl(user.email)} onClick={() => {this.setState({userMenuToggle: !this.state.userMenuToggle})}}/>
            <DropMenu toggle={this.state.userMenuToggle}>
              <ul style={styles.userMenu}>
                <Link style={styles.menuLi} to="/profile" onClick={() => {this.setState({userMenuToggle: false})}}>Profile</Link>
                <button style={styles.menuLi} onClick={() => {}}>Log out</button>
              </ul>
            </DropMenu>
        </div>
      );
    }
    return (
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.state.loginUser,
    path: state.routing.locationBeforeTransitions.pathname
  };
};

export default connect(mapStateToProps)(Nav);

