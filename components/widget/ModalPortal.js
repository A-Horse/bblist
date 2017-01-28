import React, { Component, PropTypes } from 'react';
var div = React.DOM.div;

var CLASS_NAMES = {
  overlay: {
    base: 'modal__overlay',
    afterOpen: 'modal__overlay--after-open',
    beforeClose: 'modal__overlay--before-close'
  },
  content: {
    base: 'modal__content',
    afterOpen: 'modal__content--after-open',
    beforeClose: 'modal__content--before-close'
  }
};


export class ModalPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      afterOpen: false,
      beforeClose: false,
      style: {
        overlay: {},
        content: {}
      }
    };
  }

  focusContent() {
    this.refs.content.focus();
  }

  handleKeyDown(event) {
    if (event.keyCode == 27 /*esc*/) {
      event.preventDefault();
      this.requestClose(event);
    }
  }

  onOverlayClick() {
    
  }

  requestClose() {
    this.props.close && this.props.close();
  }

  buildClassName(which, additional) {
    var className = CLASS_NAMES[which].base;
    if (this.state.afterOpen)
      className += ' '+ CLASS_NAMES[which].afterOpen;
    if (this.state.beforeClose)
      className += ' '+ CLASS_NAMES[which].beforeClose;
    return additional ? className + ' ' + additional : className;
  }

  render() {
    // TODO fix settimeout
    if (this.props.toggle) {
      setTimeout(() => {
        this.focusContent();
      });
    }

    if (this.props.toggle) {
      return (
        <div ref='overlay' className={this.buildClassName('overlay', this.props.overlayClassName)}
             onClick={this.onOverlayClick.bind(this)} style={this.props.overlayStyle}>
          <div ref='content' className={this.buildClassName('content', this.props.className)} tabIndex='-1'
               style={this.props.modalStyle} onKeyDown={this.handleKeyDown.bind(this)}>
            {this.props.children}
          </div>
        </div>
      );
    }
    return React.DOM.noscript();
  }
}
