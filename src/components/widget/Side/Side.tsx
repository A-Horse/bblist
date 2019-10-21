import React, { Component } from 'react';

import './Side.scss';

export class Side extends Component<{
  className?: string;
}> {
  buildClassName = () => {
    return `Side ${this.props.className}`;
  };

  render() {
    return (
      <div
        className={this.buildClassName()}
      >
        {this.props.children}
      </div>
    );
  }
}
