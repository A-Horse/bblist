import React, { Component } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { AppIcon } from '../Icon';

export class SideItem extends Component<{
  icon?: IconProp;
  children;
}> {
  render() {
    return (
      <div className="SideItem">
        {this.props.icon ? (
          <AppIcon className="SideItem--icon" icon={this.props.icon} />
        ) : null}
        <span>{this.props.children}</span>
      </div>
    );
  }
}
