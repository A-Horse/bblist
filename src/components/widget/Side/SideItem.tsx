import React, { Component } from 'react';
import { AppIcon } from '../Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export class SideItem extends Component<{
  icon?: IconProp;
  name: string;
}> {
  render() {
    return <div style={{}}>{this.props.icon ? <AppIcon icon={this.props.icon} /> : null}
        <span>{this.props.name}</span>
    </div>;
  }
}
