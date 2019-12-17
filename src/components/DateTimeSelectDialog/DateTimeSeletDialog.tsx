import React, { Component } from 'react';
import { ModalHeader } from '../widget/ModalHeader/ModalHeader';
import { AppModal } from '../widget/AppModal';
import { AppDateTimePicker } from '../widget/DatePicker/Datepicker';
import { AppButton } from '../widget/AppButton';

interface InputProps {
  onConfirm: Function;
  onCancel: Function;
  isOpen: boolean;
}

interface State {
  value: Date | undefined;
}

export class DateTimeSelectDialog extends Component<InputProps, State> {
  state = {
    value: undefined
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
      <AppModal className="DeadlineSelectDialog" isOpen={this.props.isOpen} onRequestClose={this.closeModal}>
        <ModalHeader onClose={this.closeModal} />

        <AppDateTimePicker value={this.state.value} onChange={this.onChange} />

        <AppButton onClick={this.onConfirm}>OK</AppButton>
      </AppModal>
    );
  }
}
