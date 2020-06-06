import './ProjectIssue.scss';

import React from 'react';

import { IProjectIssue } from '../../../../typings/project-issue.typing';
import { IssueId } from '../IssueId/IssueId';

interface InputProps {
  issue: IProjectIssue;
  rankProjectCardColumn: Function;
  kanbanId: string;
  onClick: (issueId: string) => void;
}

export function KanbanIssue({ issue, onClick }: InputProps) {
  return (
    <div onClick={() => onClick(issue.id)} className="ProjectIssue">
      <IssueId id={issue.id} />
      <div className="ProjectIssue--title">{issue.title}</div>
    </div>
  );
}
