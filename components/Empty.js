import React, { Component } from 'react';

import 'style/component/empty.scss';

export class Empty extends Component {
  render() {
    return (
      <div className="empty">
        <img src="/assets/images/nothing.png" />
      </div>
    );
  }
}

export default Empty;
