import React, { Component } from 'react';
import { TextLogo } from '../TextLogo';
import octopusImage from '../../../assets/octopus.png';

import './LogoBan.scss';

export class LogoBan extends Component {
  render() {
    return (
      <div className="logoban">
        <img
          src={octopusImage}
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
