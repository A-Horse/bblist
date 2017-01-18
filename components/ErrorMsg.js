import React, {Component} from 'react';

import 'style/component/error-msg.scss';

export class Logo extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <img className='logo' src='/static/image/logo.png'/>
    );
  }
}
