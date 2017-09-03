import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';
import elementClass from 'element-class';
import ReactDOM from 'react-dom';

import { ModalPortal } from './ModalPortal';
import 'style/component/widget/modal.scss';

export class Modal extends Component {
  // https://github.com/reactjs/react-modal/blob/master/lib/components/Modal.js
  static propTypes: {
    toggle: PropTypes.bool.isRequired
  };

  static defaultProps: {
    toggle: false,
    ariaHideApp: true,
    closeTimeoutMS: 0,
    shouldCloseOnOverlayClick: true
  };

  constructor() {
    super();
    this.hasAppendToBody = false;
  }

  componentDidMount() {
    this.node = document.createElement('div');
    this.node.className = 'modal-portal';
    this.renderPortal(this.props);
  }

  componentWillUnmount() {
    DOM.unmountComponentAtNode(this.node);
    if (this.hasAppendToBody) {
      document.body.removeChild(this.node);
    }
    elementClass(document.body).remove('modal__body--open');
  }

  renderPortal(props) {
    if (props.toggle) {
      if (!this.hasAppendToBody) {
        document.body.appendChild(this.node);
        this.hasAppendToBody = true;
      }
      elementClass(document.body).add('modal__body--open');
    } else {
      elementClass(document.body).remove('modal__body--open');
    }
    ReactDOM.render(<ModalPortal {...props} />, this.node);
  }

  componentWillReceiveProps(newProps) {
    this.renderPortal(newProps);
  }

  render() {
    return DOM.noscript();
  }
}
