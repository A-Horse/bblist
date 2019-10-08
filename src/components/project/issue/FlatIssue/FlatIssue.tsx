import './FlatIssue.scss';

import React, { useRef } from 'react';
import { ProjectIssueRecord } from '../../../../typings/kanban-card.typing';

interface InputProps {
  issue: ProjectIssueRecord;
}

export const FlatIssue = React.forwardRef<HTMLDivElement, InputProps>(({ issue }) => {
  const elementRef = useRef(null);

  return (
    <div className="FlatIssue" ref={elementRef}>
      <div>{issue.get('id')}</div>
      {issue.get('title')} - {issue.get('order')}
    </div>
  );
});
