import './FlatIssue.scss';

import React from 'react';
import { ProjectIssueRecord } from '../../../../typings/project-issue.typing';

interface InputProps {
  issue: ProjectIssueRecord;
  onClick: Function
}

export const FlatIssue = ({ issue, onClick }: InputProps) => {
  const clickHandle = () => onClick(issue);
  
  return (
    <div className="FlatIssue" onClick={clickHandle}>
      <div>{issue.get('id')}</div>
      {issue.get('title')}      
    </div>
  );
};
