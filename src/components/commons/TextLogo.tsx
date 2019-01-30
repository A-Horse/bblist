import React, { Component } from 'react';
import textLogo from '../../assets/text-logo.svg';
import textLogoWhite from '../../assets/text-logo-white.svg';


export class TextLogo extends Component<{
  white?: boolean
}> {
  render() {
    return <img alt="" className="TextLogo" style={{
      width: 100
    }} src={this.props.white ? textLogoWhite : textLogo} />;
  }
}
