import './IssueDetailModal.scss';

import React, { useEffect } from 'react';
import { AppModal } from '../../../../widget/Modal/AppModal';
import { ModalHeader } from '../../../../widget/Modal/ModalHeader/ModalHeader';
import { IssueDetail } from './IssueDetail';
import { IssueDetailBread } from './IssueDetailBread/IssueDetailBread';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProjectIssueDetailRequest } from '../../../../redux/actions/project-issue-detail.action';

interface InputProps {
  issueId: string;
  projectId: string;
  kanbanId: string;
}

export function IssueDetailModal({ issueId, projectId, kanbanId }: InputProps) {
  const history = useHistory();
  const match = useRouteMatch();
  const closeModal = () => {
    history.push(match.url);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectIssueDetailRequest({ issueId: issueId }));
  }, [dispatch, issueId]);

  return (
    <AppModal
      className="IssueDetailModal"
      isOpen={true}
      shouldCloseOnOverlayClick={false}
      onRequestClose={closeModal}
    >
      <ModalHeader onClose={closeModal}>
        <IssueDetailBread
          kanbanID={kanbanId}
          projectID={projectId}
          issueID={issueId}
        />
      </ModalHeader>

      <IssueDetail
        issueId={issueId}
        kanbanId={kanbanId}
        projectId={projectId}
      />
    </AppModal>
  );
}
