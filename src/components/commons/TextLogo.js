import React, { Component } from 'react';

export class TextLogo extends Component {
  render() {
    if (this.props.white) {
      return <img alt="" className="logo-text" src="/static/text-logo-white.svg" />;
    }
    return <img alt="" className="logo-text" src="/static/text-logo.svg" />;
  }
}
