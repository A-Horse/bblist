import './KanbanColumn.scss';
import React from 'react';

import { KanbanIssue } from '../../../../../../components/Project/Issue/ProjectIssue/KanbanIssue';
import { IProjectIssue } from '../../../../../../typings/project-issue.typing';
import { ColumnIssueCreator } from './ColumnIssueCreator/ColumnIssueCreator';
import { IColumn } from '../../../../../../typings/kanban-column.typing';
import { useHistory } from 'react-router-dom';

interface InputProps {
  column: IColumn;
  projectId: string;
  kanbanId: string;
  onIssueClick: Function;
}

export function KanbanColumn({ column, projectId, kanbanId }: InputProps) {
  const history = useHistory();
  const onIssueClick = (issueId: string) => {
    history.push(
      `/project/${projectId}/kanban/${kanbanId}?selectIssue=${issueId}`
    );
  };

  return (
    <div className="KanbanColumn">
      <div className="KanbanColumn--main">
        <div className="KanbanColumn--header">
          <span className="KanbanColumn--header-name">{column.name}</span>
        </div>

        <div className="KanbanColumn--content">
          <div>
            {column.issues!.map((issue: IProjectIssue) => {
              return (
                <KanbanIssue
                  key={issue.id}
                  kanbanId={column.kanbanId}
                  onClick={onIssueClick}
                  issue={issue}
                />
              );
            })}
          </div>
        </div>

        <ColumnIssueCreator
          projectId={projectId}
          kanbanId={column.kanbanId}
          columnId={column.id}
        />
      </div>
    </div>
  );
}
