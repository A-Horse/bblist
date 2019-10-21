import './FlatIssue.scss';

import React from 'react';
import { ProjectIssueRecord } from '../../../../typings/project-issue.typing';

interface InputProps {
  issue: ProjectIssueRecord;
  onClick: Function;
}

export const FlatIssue = ({ issue, onClick }: InputProps) => {
  const clickHandle = () => onClick(issue);

  return (
    <div className="FlatIssue" onClick={clickHandle}>
      <span className="FlatIssue--id">{issue.get('id')}</span>
      {issue.get('title')}
    </div>
  );
};
