import './IssueDetailModal.scss';

import React, { Component } from 'react';
import { RouteComponentProps, RouterProps, withRouter } from 'react-router';
import { ModalHeader } from '../widget/ModalHeader/ModalHeader';
import { AppModal } from '../widget/AppModal';
import { AppDateTimePicker } from '../widget/DatePicker/DatePicker';

interface InputProps {
  issueId: string;
  projectID: string;
  kanbanID: string;
}

interface State {
  date: Date | null
}


export class DeadlineSelectDialog extends Component<InputProps, State> {

  state = {
    date: null
  }

  closeModal = () => {
  };

  onChange = () => {

  };

  render() {
    return (
      <AppModal className="DeadlineSelectDialog" isOpen={true} onRequestClose={this.closeModal}>
        <ModalHeader onClose={this.closeModal} />

        <AppDateTimePicker value={this.state.date} onChange={this.onChange} />

      </AppModal>
    );
  }
}

