import './IssueDetailModal.scss';

import React, { Component } from 'react';
import { AppModal } from '../../../widget/AppModal';
import { IssueDetail } from './IssueDetail';
import { withRouter, RouterProps, RouteComponentProps } from 'react-router';
import { ModalHeader } from '../../../widget/ModalHeader/ModalHeader';

interface InputProps {
  issueId: string;
}

type Props = InputProps & RouteComponentProps;

class IssueDetailModalComponent extends Component<Props> {
  closeModal = () => {
    this.props.history.push(this.props.match.url);
  };

  render() {
    return (
      <AppModal className="IssueDetailModal" isOpen={true} onRequestClose={this.closeModal}>
        <ModalHeader onClose={this.closeModal} />
        <IssueDetail issueId={this.props.issueId} />
      </AppModal>
    );
  }
}

export const IssueDetailModal = withRouter<Props>(IssueDetailModalComponent);
