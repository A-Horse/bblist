import React, { Component } from 'react';

import './Side.scss';

export class Side extends Component<{
  width?: number;
}> {
  render() {
    return (
      <div
        style={{
          width: this.props.width || 200
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
