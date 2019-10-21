import React, { Component } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { AppIcon } from '../Icon';
import { NavLink } from 'react-router-dom';

export class SideItemLink extends Component<{
  icon?: IconProp;
  name: string;
  to: string;
}> {
  render() {
    return (
      <div className="SideItemLink">
        {this.props.icon ? <AppIcon className="SideItemLink--icon" icon={this.props.icon} /> : null}

        <NavLink to={this.props.to} activeClassName="active">
          {this.props.name}
        </NavLink>
      </div>
    );
  }
}
