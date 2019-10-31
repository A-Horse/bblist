import './IssueDetailModal';

import React, { Component } from 'react';
import { AppModal } from '../../../widget/AppModal';
import { IssueDetail } from './IssueDetail';
import { withRouter, RouterProps, RouteComponentProps } from 'react-router';

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
      <AppModal isOpen={true} onRequestClose={this.closeModal}>
        <IssueDetail issueId={this.props.issueId} />
      </AppModal>
    );
  }
}

export const IssueDetailModal = withRouter<Props>(IssueDetailModalComponent)
