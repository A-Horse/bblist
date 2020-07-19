import React from 'react';
import {  Draggable } from 'react-beautiful-dnd';
import { IProjectIssue } from '../../../../typings/project-issue.typing';
import { FlatIssue } from '../../../../components/Project/Issue/FlatIssue/FlatIssue';

interface Props {
  issue: IProjectIssue;
  index: number;
  onClick: Function;
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  background: isDragging ? 'lightgreen' : '#e8e8e8',
  ...draggableStyle,
});

export function SortableFlatIssue({ issue, index, onClick }: Props) {
  return (
    <Draggable key={issue.id} draggableId={issue.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <FlatIssue issue={issue} onClick={onClick} />
        </div>
      )}
    </Draggable>
  );
}
