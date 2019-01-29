import React, { Component } from 'react';

import textLogo from '../../assets/text-logo.svg';


export class TextLogo extends Component {
  render() {
    return <img alt="" className="TextLogo" style={{
      width: 100
    }} src={textLogo} />;
  }
}
