import './IssueDetailModal.scss';

import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { AppModal } from '../../../../widget/Modal/AppModal';
import { ModalHeader } from '../../../../widget/Modal/ModalHeader/ModalHeader';
import { IssueDetail } from './IssueDetail';
import { IssueDetailBread } from './IssueDetailBread/IssueDetailBread';

interface InputProps {
  issueID: string;
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
        shouldCloseOnOverlayClick={false}
        onRequestClose={this.closeModal}
      >
        <ModalHeader onClose={this.closeModal}>
          <IssueDetailBread
            kanbanID={this.props.kanbanID}
            projectID={this.props.projectID}
            issueID={this.props.issueID}
          />
        </ModalHeader>

        <IssueDetail
          issueID={this.props.issueID}
          kanbanID={this.props.kanbanID}
          projectID={this.props.projectID}
        />
      </AppModal>
    );
  }
}

export const IssueDetailModal = withRouter<Props, any>(
  IssueDetailModalComponent
);
