import './IssueDetailModal.scss';

import React, { useEffect } from 'react';
import { AppModal } from '../../../../widget/Modal/AppModal';
import { ModalHeader } from '../../../../widget/Modal/ModalHeader/ModalHeader';
import { IssueDetail } from './IssueDetail';
import { IssueDetailBread } from './IssueDetailBread/IssueDetailBread';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { queryProjectIssueDetailRequest } from '../../../../redux/actions/project-issue-detail.action';
import { RootState } from '../../../../redux/reducer';
import { selectIssue } from '../../../../redux/reducer/selector/issue.selector';

interface InputProps {
  issueId: string;
  projectId: string;
}

export function IssueDetailModal({ issueId, projectId }: InputProps) {
  const history = useHistory();
  const match = useRouteMatch();
  const closeModal = () => {
    history.push(match.url);
  };
  const dispatch = useDispatch();

  const issue = useSelector((state: RootState) => selectIssue(state, issueId));

  useEffect(() => {
    dispatch(queryProjectIssueDetailRequest({ issueId: issueId }));
  }, [dispatch, issueId]);

  if (!issue) {
    return null;
  }
  return (
    <AppModal
      className="IssueDetailModal"
      isOpen={true}
      shouldCloseOnOverlayClick={false}
      onRequestClose={closeModal}
    >
      <ModalHeader onClose={closeModal} hiddenBorder>
        <IssueDetailBread
          kanbanId={issue.kanbanId}
          projectId={projectId}
          issueId={issueId}
        />
      </ModalHeader>

      <IssueDetail
        issueId={issueId}
        kanbanId={issue.kanbanId}
        projectId={projectId}
        closeModal={closeModal}
      />
    </AppModal>
  );
}
