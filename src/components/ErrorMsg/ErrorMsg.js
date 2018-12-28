import React, { Component } from 'react';
import * as R from 'ramda';

import './ErrorMsg.scss';

export class ErrorMsg extends Component {
  render() {
    const messages = this.props.messages.filter(R.complement(R.isNil));
    if (!messages.length) {
      return null;
    }
    return (
      <div className="error-msg">
        <ul>
          {messages.map((message, i) => {
            return <li key={i}>{message}</li>;
          })}
        </ul>
      </div>
    );
  }
}
