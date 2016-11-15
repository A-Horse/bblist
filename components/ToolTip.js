import React, { Component, PropTypes } from 'react';
var div = React.DOM.div;


export class ToolTip extends Component {
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
  
  componentDidMount() {
    // Focus needs to be set when mounting and already open
    if (this.props.toggle) {
      this.setFocusAfterRender(true);
      this.open();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.closeTimer);
  }

  componentWillReceiveProps(newProps) {
    // Focus only needs to be set once when the modal is being opened
    if (!this.props.toggle && newProps.toggle) {
      //this.setFocusAfterRender(true);
      this.open();
    } else if (this.props.toggle && !newProps.toggle) {
      this.close();
    }
  }

  componentDidUpdate() {
    // if (this.focusAfterRender) {
    //   //this.focusContent();
    //   //this.setFocusAfterRender(false);
    // }
  }

  setFocusAfterRender(focus) {
    //this.focusAfterRender = focus;
  }

  open() {
    if (this.state.afterOpen && this.state.beforeClose) {
      clearTimeout(this.closeTimer);
      this.setState({ beforeClose: false });
    } else {
      // focusManager.setupScopedFocus(this.node);
      // focusManager.markForFocusLater();
      this.setState({toggle: true}, function() {
        this.setState({afterOpen: true});

        if (this.props.toggle && this.props.onAfterOpen) {
          this.props.onAfterOpen();
        }
      }.bind(this));
    }
  }

  close() {
    if (!this.ownerHandlesClose())
      return;
    if (this.props.closeTimeoutMS > 0)
      this.closeWithTimeout();
    else
      this.closeWithoutTimeout();
  }

  focusContent() {
    //this.refs.content.focus();
  }

  closeWithTimeout() {
    this.setState({beforeClose: true}, function() {
      this.closeTimer = setTimeout(this.closeWithoutTimeout, this.props.closeTimeoutMS);
    }.bind(this));
  }

  closeWithoutTimeout() {
    this.setState({
      beforeClose: false,
      toggle: false,
      afterOpen: false,
    }, this.afterClose);
  }

  afterClose() {
    // focusManager.returnFocus();
    // focusManager.teardownScopedFocus();
  }

  handleKeyDown(event) {
    // if (event.keyCode == 9 /*tab*/) scopeTab(this.refs.content, event);
    if (event.keyCode == 27 /*esc*/) {
      event.preventDefault();
      this.requestClose(event);
    }
  }

  handleOverlayClick(event) {
    var node = event.target;

    // while (node) {
    //   if (node === this.refs.content) return
    //   node = node.parentNode
    // }

    // if (this.props.shouldCloseOnOverlayClick) {
    //   if (this.ownerHandlesClose())
    //     this.requestClose(event);
    //   else
    //     this.focusContent();
    // }
  }

  requestClose(event) {
    if (this.ownerHandlesClose())
      this.props.onRequestClose(event);
  }

  ownerHandlesClose() {
    return this.props.onRequestClose;
  }

  shouldBeClosed() {
    return !this.props.toggle && !this.state.beforeClose;
  }

  buildClassName(which, additional) {
    var className = CLASS_NAMES[which].base;
    if (this.state.afterOpen)
      className += ' '+CLASS_NAMES[which].afterOpen;
    if (this.state.beforeClose)
      className += ' '+CLASS_NAMES[which].beforeClose;
    return additional ? className + ' ' + additional : className;
  }

  render() {
    return this.shouldBeClosed() ? div() : (
      div({
        ref: 'overlay',
        className: this.buildClassName('overlay', this.props.overlayClassName),
        onClick: this.props.onOverlayClick,
        style: this.props.overlayStyle || {}
      },
          div({
            ref: 'content',
            className: this.buildClassName('content', this.props.className),
            style: this.props.modalStyle || {},
            tabIndex: "-1",
            onKeyDown: this.handleKeyDown.bind(this)
          },
              this.props.children
             )
         )
    );
  }
}
