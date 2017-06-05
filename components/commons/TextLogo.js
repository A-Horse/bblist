import React, {Component} from 'react';

export class TextLogo extends Component {
  render() {
    if (this.props.white) {
      return <img className='text-logo' src='/static/text-logo-white.svg'/>;
    }

    return <img className='text-logo' src='/static/text-logo.svg'/>;
  }
}
