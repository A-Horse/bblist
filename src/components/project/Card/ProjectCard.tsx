import './ProjectCard.scss';

import React, { Component, useImperativeHandle, useRef, RefForwardingComponent } from 'react';
import { DragSource, DropTarget, DndProviderProps, DndComponentClass, ConnectDragSource, ConnectDragPreview, ConnectDropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux'
import { ProjectCardRecord } from '../../../typings/kanban-card.typing';


interface InputProps {
  card: ProjectCardRecord;
}

interface DndProps {
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void

  isDragging: boolean
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
}

interface CardInstance {
  getNode(): HTMLDivElement | null
}

type CardComponent = RefForwardingComponent<HTMLDivElement, InputProps & DndProps>;

const Card = React.forwardRef<HTMLDivElement, InputProps & DndProps>(
  ({ card, isDragging, connectDragSource, connectDropTarget }, ref) => {
    const elementRef = useRef(null)
    connectDragSource(elementRef)
    connectDropTarget(elementRef)

    const opacity = isDragging ? 0 : 1
    useImperativeHandle<{}, CardInstance>(ref, () => ({
      getNode: () => elementRef.current,
    }))
    return (
      <div ref={elementRef} style={{  opacity }}>
        {card.get('title')}
      </div>
    )
  },
)

export const ProjectCard = DropTarget(
  'CARD',
  {
    drop(props: any, monitor: any, component: CardComponent) {
      console.log(monitor.getItem());
      console.log(props.card);
    },
    canDrop(props, monitor) {
      const item = monitor.getItem();
      return item.card.get('id') !== props.card.get('id');
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
    sourceItem: monitor.getItem()
  })
)(
  DragSource('CARD', {
    beginDrag(props: any, monitor: any, component: CardComponent) {
      return {
        card: props.card,
      };
    }
  }, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))(Card)
);
