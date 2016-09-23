import React, { Component, PropTypes } from 'react';
import {Modal} from './Modal';
import R from 'fw-ramda';

export class Toast extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }
  
  cancel() {
    this.props.cancelFn && this.props.cancelFn();
    this.close();
  }

  close() {
    this.setState({isOpen: false})
  }

  render() {
    return (
      <Modal className="toast" styles={modalStyles} isOpen={this.state.isOpen}>
        <div>
          {this.children}
        </div>
      </Modal>
    );
  }
}
