import './IssueDetailModal.scss';

import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppModal } from '../../../widget/AppModal';
import { ModalHeader } from '../../../widget/ModalHeader/ModalHeader';
import { IssueDetail } from './IssueDetail';

interface InputProps {
  issueId: string;
  projectID: string;
  kanbanID: string;
}

type Props = InputProps & RouteComponentProps;

class IssueDetailModalComponent extends Component<Props> {
  closeModal = () => {
    this.props.history.push(this.props.match.url);
  };

  render() {
    return (
      <AppModal
        className="IssueDetailModal"
        isOpen={true}
        onRequestClose={this.closeModal}
      >
        <ModalHeader onClose={this.closeModal} cover={true} />
        <IssueDetail
          issueID={this.props.issueId}
          kanbanID={this.props.kanbanID}
          projectID={this.props.projectID}
        />
      </AppModal>
    );
  }
}

export const IssueDetailModal = withRouter<Props>(IssueDetailModalComponent);
