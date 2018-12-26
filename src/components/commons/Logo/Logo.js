//
import React, { Component } from "react";

export class Logo extends Component {
  render() {
    if (this.props.white) {
      return <img className="logo" src="/assets/new-logo-white.png" />;
    }
    return <img className="logo" src="/assets/new-logo.png" />;
  }
}
