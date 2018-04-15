// @flow
import React, { Component } from 'react';
import { Logo } from '../Logo/Logo';
import { TextLogo } from '../TextLogo';

import './LogoBan.less';

export class LogoBan extends Component<{
  white: boolean
}> {
  render() {
    return (
      <div className="logoban">
        <Logo white={this.props.white} />
        <TextLogo white={this.props.white} />
      </div>
    );
  }
}
