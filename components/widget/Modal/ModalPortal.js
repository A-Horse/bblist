import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { timeout } from 'utils/timeout';
import DOM from 'react-dom-factories';
var div = DOM.div;

var CLASS_NAMES = {
  overlay: {
    base: 'modal__overlay',
    afterOpen: ' after-open',
    beforeClose: ' before-close'
  },
  content: {
    base: 'modal__content',
    afterOpen: ' after-open',
    beforeClose: ' before-close'
  }
};

export class ModalPortal extends Component {
  static propTypes = {
    toggle: PropTypes.bool.isRequired,
    close: PropTypes.func
  };

  state = {
    afterOpen: false,
    beforeClose: false
  };

  constructor(props) {
    super(props);
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onContengClick = this.onContengClick.bind(this);
  }

  async componentDidMount() {
    if (this.props.toggle) {
      await timeout();
      this.setState({ afterOpen: true });
      this.focusContent();
    }
  }

  async componentWillReceiveProps(newProps) {
    if (newProps.toggle === true && newProps.toggle !== this.props.toggle) {
      await timeout();
      this.setState({ afterOpen: true });
      this.focusContent();
    }
    if (newProps.toggle === false && newProps.toggle !== this.props.toggle) {
      this.setState({ afterOpen: false });
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

  onContengClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  async requestClose() {
    this.setState({ beforeClose: true });
    await timeout(200);
    this.props.close && this.props.close();
    this.setState({ beforeClose: false });
  }

  buildClassName(which, additional) {
    let className = CLASS_NAMES[which].base;
    if (this.state.beforeClose) {
      className += CLASS_NAMES[which].beforeClose;
    }
    if (this.state.afterOpen) {
      className += CLASS_NAMES[which].afterOpen;
    }
    return additional ? className + ' ' + additional : className;
  }

  render() {
    if (this.props.toggle) {
      return (
        <div
          ref="overlay"
          className={this.buildClassName('overlay', this.props.overlayClassName)}
          onClick={this.onOverlayClick}
        >
          <div
            ref="content"
            className={this.buildClassName('content', this.props.className)}
            tabIndex="-1"
            onClick={this.onContengClick}
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
