import React, { Component, CSSProperties } from 'react';
import textLogo from '../../assets/text-logo.svg';
import textLogoWhite from '../../assets/text-logo-white.svg';


export class TextLogo extends Component<{
  white?: boolean,
  style?: CSSProperties
}> {
  render() {
    return <img alt="" className="TextLogo" style={{
      width: 100,
      ...this.props.style
    }} src={this.props.white ? textLogoWhite : textLogo} />;
  }
}
