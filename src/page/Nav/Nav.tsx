import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logo } from '../../components/Logo/Logo';
import { TextLogo } from '../../components/TextLogo';
import { AppDropDown } from '../../widget/DropDown/AppDropDown';
import { UserAvatar } from '../../components/UserAvatar/UserAvatar';
import { AppMenu, AppMenuItem } from '../../widget/Menu/Menu';
import { AppButton } from '../../widget/Button';
import { AppLink } from '../../widget/Link/AppLink';
import * as _ from 'lodash';

import { DisplayAccount } from '../../typings/user.typing';

import './Nav.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth.action';

// TODO: move components
export function Nav(props: { user: DisplayAccount }) {
  const dispatch = useDispatch();
  const { user } = props;

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
          toggle={(show: boolean) => (
            <AppButton
              noOpacity
              style={
                show
                  ? {
                      backgroundColor: 'white',
                      position: 'relative',
                      top: 1,
                    }
                  : {
                      position: 'relative',
                      top: 1,
                    }
              }
            >
              <UserAvatar user={user} />
            </AppButton>
          )}
          overlay={
            <AppMenu>
              <AppMenuItem>
                <AppLink to="/profile">
                  <strong>{_.get(user, 'username')}</strong>已登录
                </AppLink>
              </AppMenuItem>
              <AppMenuItem>
                <AppLink to="/setting">设置</AppLink>
              </AppMenuItem>

              <AppMenuItem
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <span>登出</span>
              </AppMenuItem>
            </AppMenu>
          }
        />
      </div>
    </header>
  );
}
