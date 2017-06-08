import React, {Component} from 'react';

import 'style/component/error-msg.scss';

export class ErrorMsg extends Component {
  static propTypes = {
    messages: React.PropTypes.array.isRequired
  }

  renderMessages() {
    return (
      <ul>
        {
          this.props.messages.map((message, i) => {
            return <li key={i}>{message}</li>
          })
        }
      </ul>
    );
  }

  render() {
    if (!this.props.messages.length) {
      return React.DOM.noscript();
    }
    return (
      <div className='error-msg'>
        {this.renderMessages()}
      </div>
    );
  }
}
