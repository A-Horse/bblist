import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { RootState } from '../../../../../redux/reducer';
import { selectKanbanColumns } from '../../../../../redux/reducer/selector/kanban.selector';
import { KanbanColumn } from './Column/KanbanColumn';
import { useDispatch, useSelector } from 'react-redux';

import './Kanban.scss';
import { IColumn } from '../../../../../typings/kanban-column.typing';
import { DragDropContext } from 'react-beautiful-dnd';
import { rankIssue } from '../../../../../redux/actions/issue.action';
import { IIssue } from '../../../../../typings/project-issue.typing';
import { updateIssueDetailRequest } from '../../../../../redux/actions/project-issue-detail.action';

interface InputProps {
  kanbanId: string;
  projectId: string;
}

export function Kanban({ kanbanId, projectId }: InputProps) {
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const onIssueClick = (issueId: string) => {
    history.push(match.url + `?issueId=${issueId}`);
  };

  const columns = useSelector((state: RootState) =>
    selectKanbanColumns(state, kanbanId)
  );

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!result.destination) {
      return;
    }
    const sourceIssue = columns.find((c) => c.id === source.droppableId)!
      .issues![source.index];
    const targetIssue = columns.find((c) => c.id === destination.droppableId)!
      .issues![destination.index];
    const inSameColumn = source.droppableId === destination.droppableId;
    if (targetIssue) {
      dispatch(
          rankIssue(
              sourceIssue,
              targetIssue,
              inSameColumn ? result.source.index > result.destination.index : true
          )
      );
    }

    if (!inSameColumn) {
      dispatch(
        updateIssueDetailRequest({
          id: draggableId,
          columnId: destination.droppableId,
        })
      );
    }
  }

  return (
    <div className="Kanban">
      <div className="Kanban-ColumnContainer">
        <DragDropContext onDragEnd={onDragEnd}>
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
        </DragDropContext>
      </div>
    </div>
  );
}
