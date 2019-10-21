import React, { Component } from 'react';

import './Side.scss';

export class Side extends Component<{
  width?: number;
  className?: string;
}> {
  buildClassName = () => {
    return `Side ${this.props.className}`;
  };

  render() {
    return (
      <div
        className={this.buildClassName()}
        style={{
          width: this.props.width || 200
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
