import './Side.scss';

import React, { Component } from 'react';

export class Side extends Component<{
  className?: string;
}> {
  buildClassName = () => {
    return `Side ${this.props.className}`;
  };

  render() {
    return <div className={this.buildClassName()}>{this.props.children}</div>;
  }
}
