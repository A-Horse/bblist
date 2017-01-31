import React, {Component} from 'react';
import {Logo} from './Logo';
import {TextLogo} from './TextLogo';
import {browserHistory} from 'react-router';

import 'style/component/commons/logoban.scss';

export class LogoBan extends Component {
  onClick() {
    browserHistory.push('/');
  }

  render() {
    // TODO inline text-logo svg
    return (
        <div className='logoban' onClick={this.onClick.bind(this)}>
        <Logo/>
        <TextLogo/>
      </div>
    );
  }
}
