import './KanbanColumn.scss';
import React from 'react';

import { IProjectIssue } from '../../../../../../typings/project-issue.typing';
import { ColumnIssueCreator } from './ColumnIssueCreator/ColumnIssueCreator';
import { IColumn } from '../../../../../../typings/kanban-column.typing';
import { useHistory } from 'react-router-dom';
import { Droppable } from 'react-beautiful-dnd';
import { DraggableKanbanIssue } from '../../../../../../components/Project/Issue/KanbanIssue/DraggableKanbanIssue';

interface InputProps {
  column: IColumn;
  projectId: string;
  kanbanId: string;
  onIssueClick: Function;
}

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : undefined,
  minHeight: 30
});

export function KanbanColumn({ column, projectId, kanbanId }: InputProps) {
  const history = useHistory();
  const onIssueClick = (issueId: string) => {
    history.push(
      `/project/${projectId}/kanban/${kanbanId}?selectIssue=${issueId}`
    );
  };

  return (
    <div className="KanbanColumn">
      <div
        className="KanbanColumn--main"
        style={{
          backgroundColor: 'rgb(230, 246, 255)',
        }}
      >
        <div className="KanbanColumn--header">
          <span className="KanbanColumn--header-name">{column.name}</span>
        </div>

        <div className="KanbanColumn--content">
          <Droppable key={column.id} droppableId={`${column.id}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {column.issues!.map((issue: IProjectIssue, index: number) => {
                  return (
                    <DraggableKanbanIssue
                      index={index}
                      key={issue.id}
                      kanbanId={column.kanbanId}
                      onClick={onIssueClick}
                      issue={issue}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
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
