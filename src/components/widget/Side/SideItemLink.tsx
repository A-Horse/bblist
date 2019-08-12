import React, { Component } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { AppIcon } from '../Icon';

export class SideItem extends Component<{
  icon?: IconProp;
  name: string;
}> {
  render() {
    return (
      <div style={{}}>
        {this.props.icon ? <AppIcon icon={this.props.icon} /> : null}
        <span>{this.props.name}</span>
      </div>
    );
  }
}
