import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from './Modal';

export class Toast extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false
    };
  }

  cancel() {
    this.props.cancelFn && this.props.cancelFn();
    this.close();
  }

  close() {
    this.setState({ toggle: false });
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
