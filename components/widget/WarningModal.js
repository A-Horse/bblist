import React, { Component, PropTypes } from 'react';

import {Modal} from './Modal';
import R from 'ramda';
import {getAssets} from '../../services/assets-manager';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '140px',
    left: '140px',
    right: '140px',
    bottom: '140px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
};

const styles = {
  main: {

  },
  close: {
    position: 'absolute'

  }
};

export class WarningModal extends Component {
  propTypes: {
    confirmFn: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
      toggle: false
    }
  }

  init() {

  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  cancel() {
    this.props.cancelFn && this.props.cancelFn();
    this.close();
  }

  confirm() {
    this.props.confirmFn();
    this.close();
  }

  close() {
    this.setState({toggle: false})
  }

  open() {
    this.setState({toggle: true})
  }

  render() {
    return (
      <Modal styles={modalStyles} toggle={this.state.toggle}>
        <div>
          <button onClick={() => {this.confirm()}}>Confirm</button>
          <button onClick={() => {this.cancel()}}>Cancel</button>
        </div>
      </Modal>
    );
  }
}
