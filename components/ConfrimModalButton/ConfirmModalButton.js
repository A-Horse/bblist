import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/widget/Modal/Modal';
import { Button } from 'components/widget/Button/Button';
import { isEnterKey } from 'utils/keyboard';

import './ConfirmModalButton.scss';

export class ConfrimModalButton extends Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired
  };

  state = {
    toggle: false
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  buildClassName() {
    return `confrim-modal-button ${this.props.className ? ' ' + this.props.className : ''}`;
  }

  onClick() {
    this.setState({ toggle: true });
  }

  onModalClose() {
    this.setState({ toggle: false });
  }

  onConfirm() {
    this.props.onConfirm();
    this.setState({ toggle: false });
  }

  onKeyDown(event) {
    if (isEnterKey(event)) {
      this.onConfirm();
    }
  }

  render() {
    return (
      <div className={this.buildClassName()} onClick={this.onClick}>
        {this.props.children}
        <Modal
          toggle={this.state.toggle}
          close={this.onModalClose}
          className="confirm-button-modal"
          onKeyDown={this.onKeyDown}
        >
          <div>
            <div>Are you sure you want to delete it?</div>
            <div className="confrim-modal-button--operation">
              <Button
                className="confirm-button"
                type="submit"
                styleType="dangerous"
                onClick={this.onConfirm}
              >
                Confrim
              </Button>
              <Button className="cancel-button" onClick={this.onModalClose}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ConfrimModalButton;
