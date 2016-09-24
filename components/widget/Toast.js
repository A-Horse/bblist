import React, { Component, PropTypes } from 'react';
import {Modal} from './Modal';
import R from 'fw-ramda';

export class Toast extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false
    }
  }
  
  cancel() {
    this.props.cancelFn && this.props.cancelFn();
    this.close();
  }

  close() {
    this.setState({toggle: false})
  }

  render() {
    return (
      <Modal className="toast" styles={modalStyles} toggle={this.state.toggle}>
        <div>
          {this.children}
        </div>
      </Modal>
    );
  }
}
