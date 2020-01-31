import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { AppIcon } from '../Icon';

export class SideItemLink extends Component<{
  icon?: IconProp;
  name: string;
  to: string;
}> {
  render() {
    return (
      <div className="SideItemLink">
        <NavLink to={this.props.to} activeClassName="active">
          {this.props.icon ? (
            <AppIcon className="SideItemLink--icon" icon={this.props.icon} />
          ) : null}
          {this.props.name}
        </NavLink>
      </div>
    );
  }
}
