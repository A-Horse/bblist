import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { RootState } from '../../../../../redux/reducer';
import { selectKanbanColumns } from '../../../../../redux/reducer/selector/kanban.selector';
import { KanbanColumn } from './Column/KanbanColumn';
import { useSelector } from 'react-redux';

import './Kanban.scss';
import { IColumn } from '../../../../../typings/kanban-column.typing';

interface InputProps {
  kanbanId: string;
  projectId: string;
}

export function Kanban({ kanbanId, projectId }: InputProps) {
  const history = useHistory();
  const match = useRouteMatch();

  const onIssueClick = (issueId: string) => {
    history.push(match.url + `?issueId=${issueId}`);
  };

  const columns = useSelector((state: RootState) =>
    selectKanbanColumns(state, kanbanId)
  );

  return (
    <div className="Kanban">
      <div className="Kanban-ColumnContainer">
        {columns
          .sort((a: IColumn, b: IColumn) => a.order - b.order)
          .map((column: IColumn) => (
            <KanbanColumn
              key={column.id}
              column={column}
              kanbanId={kanbanId}
              projectId={projectId}
              onIssueClick={onIssueClick}
            />
          ))}
      </div>
    </div>
  );
}
