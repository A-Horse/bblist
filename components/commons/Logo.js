import React, {Component} from 'react';

import 'style/component/commons/logo.scss';

export class Logo extends Component {
  render() {
    return (
        <img className='logo' src='/static/logo.png'/>
    );
  }
}
