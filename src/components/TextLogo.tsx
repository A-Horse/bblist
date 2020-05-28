import React, { Component, CSSProperties } from 'react';

import textLogoWhite from '../assets/text-logo-white.svg';
import textLogo from '../assets/text-logo.svg';

export class TextLogo extends Component<{
  white?: boolean;
  style?: CSSProperties;
}> {
  render() {
    return (
      <img
        alt=""
        className="TextLogo"
        style={{
          width: 100,
          ...this.props.style,
        }}
        src={this.props.white ? textLogoWhite : textLogo}
      />
    );
  }
}
