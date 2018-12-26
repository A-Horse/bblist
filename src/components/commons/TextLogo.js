import React, { Component } from "react";

export class TextLogo extends Component {
  render() {
    if (this.props.white) {
      return <img className="logo-text" src="/static/text-logo-white.svg" />;
    }

    return <img className="logo-text" src="/static/text-logo.svg" />;
  }
}
