import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';
import R from 'ramda';

import './ErrorMsg.scss';

export class ErrorMsg extends Component {
  static propTypes = {
    messages: PropTypes.array
  };

  render() {
    const messages = this.props.messages.filter(R.complement(R.isNil));
    if (!messages.length) {
      return DOM.noscript();
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

export default ErrorMsg;
