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
        <img
          src="/assets/octopus.png"
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            marginTop: '5px'
          }}
        />
        <TextLogo white={this.props.white} />
      </div>
    );
  }
}
