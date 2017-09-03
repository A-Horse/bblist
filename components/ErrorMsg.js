import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import 'style/component/error-msg.scss';

export class ErrorMsg extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired
  };

  renderMessages() {
    return (
      <ul>
        {this.props.messages.map((message, i) => {
          return (
            <li key={i}>
              {message}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    if (!this.props.messages.length) {
      return DOM.noscript();
    }
    return (
      <div className="error-msg">
        {this.renderMessages()}
      </div>
    );
  }
}
