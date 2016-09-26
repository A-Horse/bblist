import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import elementClass from 'element-class';

import {ModalPortal} from './ModalPortal';
import 'style/component/widget/modal.scss';

export class Modal extends Component {
  // https://github.com/reactjs/react-modal/blob/master/lib/components/Modal.js
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

  static propTypes: {
    toggle: React.PropTypes.bool.isRequired
  };
  
  componentDidMount() {
    this.node = document.createElement('div');
    this.node.className = 'modal-portal';
    this.renderPortal(this.props);
  }
  
  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.node);
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
    ReactDOM.render(<ModalPortal {...props}></ModalPortal>, this.node);
  }

  componentWillReceiveProps(newProps) {
    this.renderPortal(newProps);
  }

  render() {
    return React.DOM.noscript();
  } 
}

