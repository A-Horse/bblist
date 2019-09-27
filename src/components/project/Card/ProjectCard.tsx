import './ProjectCard.scss';

import React, { useImperativeHandle, useRef, RefForwardingComponent } from 'react';
import { DragSource, DropTarget, ConnectDragSource, ConnectDropTarget } from 'react-dnd';
import { ProjectCardRecord } from '../../../typings/kanban-card.typing';

interface InputProps {
  card: ProjectCardRecord;
  index: number;
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

    const opacity = isDragging ? 0 : 1;
    useImperativeHandle<{}, CardInstance>(ref, () => ({
      getNode: () => elementRef.current
    }));
    return (
      <div ref={elementRef} style={{ opacity }}>
        {card.get('title')}
      </div>
    );
  }
);

export const ProjectCard = DropTarget(
  'CARD',
  {
    hover(props: any, monitor: any, component: CardInstance) {
      if (!component) {
        return null;
      }
      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node) {
        return null;
      }

      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      monitor.getItem().index = hoverIndex;

     
    },
    drop(props: any, monitor: any, component: CardComponent) {
     
    },
    canDrop(props, monitor) {
      const item = monitor.getItem();
      return item.card.get('id') !== props.card.get('id');
    }
  },
  (connect, monitor) => ({
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
