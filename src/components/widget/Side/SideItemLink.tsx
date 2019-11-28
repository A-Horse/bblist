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
        {this.props.icon ? <AppIcon className="SideItemLink--icon" icon={this.props.icon} /> : null}

        <NavLink to={this.props.to} activeClassName="active">
          {this.props.name}
        </NavLink>
      </div>
    );
  }
}
