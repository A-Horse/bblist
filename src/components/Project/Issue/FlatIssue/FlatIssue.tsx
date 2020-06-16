import './FlatIssue.scss';

import React from 'react';
import { IProjectIssue } from '../../../../typings/project-issue.typing';

interface InputProps {
  issue: IProjectIssue;
  onClick: Function;
}

export const FlatIssue = ({ issue, onClick }: InputProps) => {
  const clickHandle = () => onClick(issue);

  return (
    <div className="FlatIssue" onClick={clickHandle}>
      <span className="FlatIssue--id">{issue.id}</span>
      {issue.title}
      -
      {issue.order}
    </div>
  );
};
