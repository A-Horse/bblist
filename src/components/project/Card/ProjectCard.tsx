import './ProjectCard.scss';

import React, { useImperativeHandle, useRef, RefForwardingComponent, useCallback } from 'react';
import {
  DragSource,
  DropTarget,
  ConnectDragSource,
  ConnectDropTarget,
  XYCoord,
  DropTargetMonitor
} from 'react-dnd';
import { ProjectIssueRecord } from '../../../typings/project-issue.typing';

interface InputProps {
  card: ProjectIssueRecord;
  rankProjectCardColumn: Function;
  kanbanId: string;
}

interface DndProps {
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDropTarget: ConnectDropTarget;
}

interface CardInstance {
  getNode(): HTMLDivElement | null;
}

type CardComponent = RefForwardingComponent<HTMLDivElement, InputProps & DndProps>;

const Card = React.forwardRef<HTMLDivElement, InputProps & DndProps>(
  ({ card, isDragging, connectDragSource, connectDropTarget }, ref) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);

    const opacity = isDragging ? 0.2 : 1;
    useImperativeHandle<{}, CardInstance>(ref, () => ({
      getNode: () => elementRef.current
    }));

    return (
      <div className="ProjectCard" ref={elementRef} style={{ opacity }}>
        <div>{card.get('id')}</div>
        {card.get('title')} - {card.get('order')}
      </div>
    );
  }
);

export const ProjectCard = DropTarget(
  'CARD',
  {
    hover(props: InputProps, monitor: DropTargetMonitor, component: CardInstance) {
      if (!component) {
        return null;
      }
      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node) {
        return null;
      }

      const dragCardId = monitor.getItem().card.get('id');
      const hoverCardId = props.card.get('id');

      const dragOrder = monitor.getItem().card.get('order');
      const hoverOrder = props.card.get('order');

      // Don't replace items with themselves
      if (dragCardId === hoverCardId) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragOrder < hoverOrder && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragOrder > hoverOrder && hoverClientY > hoverMiddleY) {
        return;
      }

      props.rankProjectCardColumn(
        {
          selectCard: monitor.getItem().card,
          targetCard: props.card,
          targetOrder: props.card.get('order') - 1,
          isBefore: true,
          kanbanId: props.kanbanId
        },
        {
          temporary: true
        }
      );
    },
    drop(props: InputProps, monitor: DropTargetMonitor, component: CardComponent) {
      props.rankProjectCardColumn(
        {
          selectCard: monitor.getItem().card,
          targetCard: props.card,
          targetOrder: props.card.get('order') - 1,
          isBefore: true,
          kanbanId: props.kanbanId
        },
        {
          temporary: false
        }
      );
    },
    canDrop(props, monitor: DropTargetMonitor) {
      const item = monitor.getItem();
      return item.card.get('id') !== props.card.get('id');
    }
  },
  (connect, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    'CARD',
    {
      beginDrag(props: any, monitor: any, component: CardComponent) {
        return {
          card: props.card
        };
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(Card)
);
