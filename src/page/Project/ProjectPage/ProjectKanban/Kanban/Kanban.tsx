import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  Route,
  RouteComponentProps,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { IssueDetailModal } from '../../../../../components/Project/Issue/IssueDetail/IssueDetailModal';
import { RootState } from '../../../../../redux/reducer';
import { selectKanbanColumns } from '../../../../../redux/reducer/selector/kanban.selector';
import { parseQueryParams } from '../../../../../utils/url.util';
import { KanbanColumn } from './Column/KanbanColumn';
import { NoColumnGuide } from './NoColumnGuide';
import { KanbanSettingModal } from '../../../KanbanSettingModal/KanbanSettingModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectProject } from '../../../../../redux/reducer/selector/project.selector';
import { getProjectKanbanDetailRequest } from '../../../../../redux/actions/kanban.action';

import './Kanban.scss';
import { queryKanbanColumns } from '../../../../../redux/actions/column.action';
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
