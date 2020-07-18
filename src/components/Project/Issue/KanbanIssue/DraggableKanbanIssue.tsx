import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { KanbanIssue } from './KanbanIssue';

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 0,
  margin: `0 0 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});
export function DraggableKanbanIssue({ issue, index, kanbanId, onClick }) {
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
          <KanbanIssue issue={issue} kanbanId={kanbanId} onClick={onClick} />
        </div>
      )}
    </Draggable>
  );
}
