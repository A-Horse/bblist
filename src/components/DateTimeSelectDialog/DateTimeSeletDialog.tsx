import React, { Component } from 'react';
import { ModalHeader } from '../widget/ModalHeader/ModalHeader';
import { AppModal } from '../widget/AppModal';
import { AppDateTimePicker } from '../widget/Datepicker/Datepicker';
import { AppButton } from '../widget/Button';

import './DateTimeSeletDialog.scss';
import { ConfirmButtonGroup } from '../widget/ButtonGroup/ConfirmGroup/ConfirmGroup';

interface InputProps {
  onConfirm: Function;
  onCancel: Function;
  isOpen: boolean;
}

interface State {
  value: Date;
}

export class DateTimeSelectDialog extends Component<InputProps, State> {
  state = {
    value: new Date()
  };

  closeModal = () => {
    this.props.onCancel && this.props.onCancel();
  };

  onChange = (date: Date) => {
    this.setState({ value: date });
  };

  onConfirm = () => {
    this.props.onConfirm(this.state.value);
  };

  render() {
    return (
      <AppModal
        className="DateTimeSelectDialog"
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
      >
        <ModalHeader title="到期日" onClose={this.closeModal} />

        <div className="DateTimeSelectDialog--main">
          <div>
            <AppDateTimePicker
              value={this.state.value}
              onChange={this.onChange}
            />
          </div>

          <ConfirmButtonGroup onConfirm={this.onConfirm} onCancel={() => {}} />
        </div>
      </AppModal>
    );
  }
}
