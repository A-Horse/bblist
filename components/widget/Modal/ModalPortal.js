import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { timeout } from 'utils/timeout';
import DOM from 'react-dom-factories';
var div = DOM.div;

var CLASS_NAMES = {
  overlay: {
    base: 'modal__overlay'
  },
  content: {
    base: 'modal__content'
  }
};

export class ModalPortal extends Component {
  state = {
    beforeOpen: false,
    beforeClose: false,
    style: {
      overlay: {},
      content: {}
    }
  };

  constructor(props) {
    super(props);
    this.onOverlayClick = this.onOverlayClick.bind(this);
  }

  async componentWillReceiveProps(newProps) {
    if (newProps.toggle === true && newProps.toggle !== this.props.toggle) {
      await timeout(200);
      this.setState({ beforeOpen: true });
      this.focusContent();
    }
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

  onOverlayClick(event) {
    event.preventDefault();
    this.requestClose();
  }

  async requestClose() {
    this.setState({ beforeClose: true });
    await timeout(200);
    this.props.close && this.props.close();
    this.setState({ beforeClose: false });
  }

  buildClassName(which, additional) {
    let className = CLASS_NAMES[which].base;
    // TODO 放在上面
    if (this.state.beforeClose) {
      className += ' before-close';
    }
    if (this.state.beforeOpen) {
      className += ' before-open';
    }
    return additional ? className + ' ' + additional : className;
  }

  render() {
    // TODO fix settimeout
    console.log('render');

    if (this.props.toggle) {
      console.log('toggle');

      return (
        <div
          ref="overlay"
          className={this.buildClassName('overlay', this.props.overlayClassName)}
          onClick={this.onOverlayClick}
          style={this.props.overlayStyle}
        >
          <div
            ref="content"
            className={this.buildClassName('content', this.props.className)}
            tabIndex="-1"
            style={this.props.modalStyle}
            onKeyDown={this.handleKeyDown.bind(this)}
          >
            {this.props.children}
          </div>
        </div>
      );
    }
    return DOM.noscript();
  }
}
