import './IssueDetailModal';

import React, { Component } from 'react';
import { AppModal } from '../../../widget/AppModal';
import { IssueDetail } from './IssueDetail';

interface InputProps {
  issueId: string;
}

export class CardDetailModal extends Component<InputProps, any> {
  state = { toggle: true };

  closeModal = () => {
    this.setState({ toggle: false });
  };

  render() {
    return (
      <AppModal isOpen={this.state.toggle} onRequestClose={this.closeModal}>
        <IssueDetail issueId={this.props.issueId} />
      </AppModal>
    );
  }
}
