import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { RootState } from '../../../../../redux/reducer';
import { selectKanbanColumns } from '../../../../../redux/reducer/selector/kanban.selector';
import { KanbanColumn } from './Column/KanbanColumn';
import {useDispatch, useSelector} from 'react-redux';

import './Kanban.scss';
import { IColumn } from '../../../../../typings/kanban-column.typing';
import {DragDropContext} from "react-beautiful-dnd";
import {rankIssue} from "../../../../../redux/actions/issue.action";

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
    console.log('drop result', result)
    const { source, destination } = result;
    if (!result.destination) {
      return;
    }

    // dispatch(
    //     rankIssue(
    //         issues[result.source.index],
    //         issues[result.destination.index],
    //         result.source.index > result.destination.index
    //     )
    // );
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
