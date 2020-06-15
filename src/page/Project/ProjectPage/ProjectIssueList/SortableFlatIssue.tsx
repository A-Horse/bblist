import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IProjectIssue } from "../../../../typings/project-issue.typing";
import { FlatIssue } from "../../../../components/Project/Issue/FlatIssue/FlatIssue";

interface Props {
  issue: IProjectIssue
  index: number
}

// TODO: remove
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 8 * 2,
  margin: `0 0 8px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

export function SortableFlatIssue({issue, index}: Props) {
  return <Draggable key={issue.id} draggableId={issue.id} index={index}>
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
       <FlatIssue issue={issue} onClick={() => {}} />
      </div>
    )}
  </Draggable>
}