import React, { Component, CSSProperties } from 'react';

import octopusImage from '../../assets/octopus.png';

export class Logo extends Component<{
  style?: CSSProperties;
}> {
  render() {
    return (
      <img
        className="Logo"
        src={octopusImage}
        alt=""
        style={{
          width: 30,
          ...this.props.style,
        }}
      />
    );
  }
}
