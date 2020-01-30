import React, { Component } from 'react';
import { ModalHeader } from '../widget/ModalHeader/ModalHeader';
import { AppModal } from '../widget/AppModal';
import { AppDateTimePicker } from '../widget/Datepicker/Datepicker';

import './DateTimeSeletDialog.scss';
import { ConfirmButtonGroup } from '../widget/ButtonGroup/ConfirmGroup/ConfirmGroup';

interface InputProps {
  onConfirm: Function;
  onCancel: Function;
  isOpen: boolean;
  deadline?: string;
}

interface State {
  value: Date | null;
}

export class DateTimeSelectDialog extends Component<InputProps, State> {
  state = {
    value: null
  };

  componentDidMount() {
    if (this.props.deadline) {
      this.setState({ value: new Date(this.props.deadline) });
    }
  }

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
        overlayClassName="DateTimeSelectDialog--overlay"
        className="DateTimeSelectDialog"
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
      >
        <ModalHeader title="到期日" onClose={this.closeModal} />

        <div className="DateTimeSelectDialog--main">
          <div>
            <AppDateTimePicker
              placeholder="选择到期日"
              value={this.state.value}
              onChange={this.onChange}
            />
          </div>

          <ConfirmButtonGroup onConfirm={this.onConfirm} onCancel={this.closeModal} />
        </div>
      </AppModal>
    );
  }
}
