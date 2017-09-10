import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/widget/Modal/Modal';
import { Button } from 'components/widget/Button/Button';

import './ConfrimModalButton.scss';

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
  }

  buildClassName() {
    return `confrim-modal-button ${this.props.className ? ' ' + this.props.className : ''}`;
  }

  onClick() {
    this.setState({ toggle: false });
  }

  onModalClose() {
    this.setState({ toggle: false });
  }

  render() {
    return (
      <div className={this.buildClassName()} onClick={this.onClick}>
        {this.props.children}
        {this.state.toggle &&
          <Modal toggle={this.state.toggle} close={this.onModalClose}>
            <div>
              <div>Are you sure you want to delete it?</div>
              <div>
                <Button
                  className="confirm-button"
                  type="submit"
                  styleType="dangerous"
                  onClick={this.props.onConfirm}
                />
                <Button className="cancel-button" onClick={this.onModalClose} />
              </div>
            </div>
          </Modal>}
      </div>
    );
  }
}

export default ConfrimModalButton;
