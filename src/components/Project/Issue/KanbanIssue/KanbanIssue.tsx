import React, { CSSProperties } from 'react';

import { IProjectIssue } from '../../../../typings/project-issue.typing';
import { IssueId } from '../IssueId/IssueId';

interface InputProps {
  issue: IProjectIssue;
  kanbanId: string;
  onClick: (issueId: string) => void;
  showBorder?: boolean;
  style?: CSSProperties;
}

export function KanbanIssue({ issue, onClick, style, showBorder }: InputProps) {
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
        ...(showBorder
          ? {
              border: '1px solid #e9e9e9',
            }
          : {}),
        ...style,
      }}
      onClick={() => onClick(issue.id)}
      className="KanbanIssue"
    >
      <IssueId id={issue.id} />
      <div
        style={{
          marginTop: 5, wordBreak: 'break-all'
        }}
      >
        {issue.title}
      </div>
    </div>
  );
}
