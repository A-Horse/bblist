import React, { CSSProperties } from 'react';

import { IIssue } from '../../../../typings/project-issue.typing';
import { IssueId } from '../IssueId/IssueId';

interface InputProps {
  issue: IIssue;
  kanbanId: string;
  onClick: (issueId: string) => void;
  style?: CSSProperties;
}

export function KanbanIssue({ issue, onClick, style }: InputProps) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '6px 8px 10px',
        width: 208,
        borderRadius: 6,
        cursor: 'pointer',
        color: '#555',
        fontSize: 14,
        userSelect: 'none',
        ...style,
      }}
      onClick={() => onClick(issue.id)}
      className="KanbanIssue"
    >
      <IssueId id={issue.id} />
      <div
        style={{
          marginTop: 5,
          wordBreak: 'break-all',
        }}
      >
        {issue.title}
      </div>
    </div>
  );
}
