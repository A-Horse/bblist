import React, { Component } from 'react';
import { Logo } from '../Logo/Logo';
import { TextLogo } from '../TextLogo';

import 'style/component/commons/logoban.scss';

export class LogoBan extends Component {
  render() {
    return (
      <div className="logoban">
        <Logo />
        <TextLogo white={this.props.white} />
      </div>
    );
  }
}
