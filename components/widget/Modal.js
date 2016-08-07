import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import elementClass from 'element-class';

import {ModalPortal} from './ModalPortal';

var renderSubtreeIntoContainer = require('react-dom').unstable_renderSubtreeIntoContainer;

var defaultStyles = {
  overlay: {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position                : 'absolute',
    top                     : '40px',
    left                    : '40px',
    right                   : '40px',
    bottom                  : '40px',
    border                  : '1px solid #ccc',
    background              : '#fff',
    overflow                : 'auto',
    WebkitOverflowScrolling : 'touch',
    borderRadius            : '4px',
    outline                 : 'none',
    padding                 : '20px'
  }
}


export class Modal extends Component {
  // https://github.com/reactjs/react-modal/blob/master/lib/components/Modal.js
  
  componentDidMount() {
    this.node = document.createElement('div');
    this.node.className = 'ReactModalPortal';
    document.body.appendChild(this.node);
    this.renderPortal(this.props);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
    elementClass(document.body).remove('ReactModal__Body--open');
  }

  renderPortal(props) {
    if (props.isOpen) {
      elementClass(document.body).add('ReactModal__Body--open');
    } else {
      elementClass(document.body).remove('ReactModal__Body--open');
    }
    
    this.portal = renderSubtreeIntoContainer(this, <ModalPortal {...Object.assign({}, props, {styles: Object.assign({}, defaultStyles, this.props.styles)})}></ModalPortal>, this.node);
  }

  componentWillReceiveProps(newProps) {
    this.renderPortal(newProps);
  }

  render() {
    return React.DOM.noscript();
  }

  defaultProps: {
    isOpen: false,
    ariaHideApp: true,
    closeTimeoutMS: 0,
    shouldCloseOnOverlayClick: true
  }
}



Modal.propTypes = {
  isOpen: React.PropTypes.bool.isRequired
}
