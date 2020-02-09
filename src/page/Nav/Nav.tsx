import './Nav.scss';

import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { storageImage } from '../../services/storage';
import { Logo } from '../../components/Logo/Logo';
import { TextLogo } from '../../components/TextLogo';
import { AppDropDown } from '../../widget/DropDown/AppDropDown';
import { UserAvatar } from '../../components/UserAvatar/UserAvatar';
import { AppMenu, AppMenuItem } from '../../widget/Menu/Menu';
import { AppButton } from '../../widget/Button';
import { AppLink } from '../../widget/Link/AppLink';

class Nav extends Component<any> {
  state = {};

  avator: any;

  links = [
    { name: 'Dash', url: '/home' },
    { name: 'Task', url: '/task-board' },
    { name: 'Todo', url: '/todo' }
  ];

  onNewAvatarImageLoaded = (event: any) => {
    storageImage('avator', event.nativeEvent.target);
  };

  render() {
    const userName = this.props.user.username;
    const { user } = this.props;

    return (
      <header className="AppNav">
        <Link className="AppNav--ban" to="/">
          <Logo />
          <TextLogo white={true} />
        </Link>
        <div className="AppNav--menu">
          <div className="app-header-menu--link-container">
            <NavLink to="/projects" activeClassName="active">
              项目
            </NavLink>

            <NavLink to="/schedule" activeClassName="active">
              日程
            </NavLink>
          </div>
        </div>

        <div className="AppNav--Avatar">
          <AppDropDown
            position="right"
            toggle={
              <AppButton>
                <UserAvatar user={user} />
              </AppButton>
            }
            overlay={
              <AppMenu>
                <AppMenuItem>
                  <AppLink to="/profile">
                    Signed in as <strong>{userName}</strong>
                  </AppLink>
                </AppMenuItem>
                <AppMenuItem>
                  <AppLink to="/setting">Setting</AppLink>
                </AppMenuItem>

                <AppMenuItem>
                  <span>Logout</span>
                </AppMenuItem>
              </AppMenu>
            }
          />
        </div>
      </header>
    );
  }
}

export default Nav;
