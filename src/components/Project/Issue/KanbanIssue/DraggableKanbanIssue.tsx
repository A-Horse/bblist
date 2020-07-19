import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { KanbanIssue } from './KanbanIssue';

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
  userSelect: isDragging ? 'none': 'default',
  padding: '4px 6px'
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
