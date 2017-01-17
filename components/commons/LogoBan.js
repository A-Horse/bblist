import React, {Component} from 'react';
import {Logo} from './Logo';
import {TextLogo} from './TextLogo';

import 'style/component/commons/logoban.scss';

export class LogoBan extends Component {
  constructor() {
    super();
  }
  
  render() {
    // TODO inline text-logo svg
    return (
      <div className='logoban'>
        <Logo/>
        <TextLogo/>
      </div>
    );
  }
}
