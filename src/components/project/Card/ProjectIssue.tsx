import './ProjectIssue.scss';

import React, { useImperativeHandle, useRef, RefForwardingComponent } from 'react';
import { DragSource, DropTarget, ConnectDragSource, ConnectDropTarget, XYCoord, DropTargetMonitor } from 'react-dnd';
import { ProjectIssueRecord } from '../../../typings/project-issue.typing';
import { findIssuePositionInColumn } from '../../../reducers/util/issue.util';

interface InputProps {
  issue: ProjectIssueRecord;
  rankProjectCardColumn: Function;
  kanbanId: string;
  onClick?: Function;
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
  ({ issue, isDragging, onClick, connectDragSource, connectDropTarget }, ref) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);

    const opacity = isDragging ? 0.2 : 1;
    useImperativeHandle<{}, CardInstance>(ref, () => ({
      getNode: () => elementRef.current
    }));

    const innerOnClick = () => {
      onClick && onClick(issue.get('id'));
    };

    return (
      <div onClick={innerOnClick} className="ProjectIssue" ref={elementRef} style={{ opacity }}>
        <div>{issue.get('id')}</div>
        {issue.get('title')}
      </div>
    );
  }
);

export const ProjectIssue = DropTarget(
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

      const dragCardId = monitor.getItem().issue.get('id');
      const hoverCardId = props.issue.get('id');

      const dragOrder = monitor.getItem().issue.get('order');
      const hoverOrder = props.issue.get('order');

      let isBefore;
      if (dragOrder > hoverOrder) {
        isBefore = true;
      } else {
        isBefore = false;
      }

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
          selectCard: monitor.getItem().issue,
          targetCard: props.issue,
          targetOrder: props.issue.get('order') - (isBefore ? 0.0001 : -0.00001),
          isBefore: isBefore,
          kanbanId: props.kanbanId
        },
        {
          temporary: true
        }
      );
    },
    drop(props: InputProps, monitor: DropTargetMonitor, component: CardComponent) {
      props.rankProjectCardColumn({
        selectCard: monitor.getItem().issue,
        kanbanId: props.kanbanId
      }, {
        temporary: false
      });
      // console.log((component as any).props.issue.get('id'));
      // const dragCardId = monitor.getItem().issue.get('id');
      // const hoverCardId = props.issue.get('id');
      // console.log('dragCardId', dragCardId);
      // console.log('hoverCardId', hoverCardId);
      // const dragOrder = monitor.getItem().issue.get('order');
      // const hoverOrder = props.issue.get('order');

      // let isBefore;
      // if (dragOrder > hoverOrder) {
      //   isBefore = true;
      // } else {
      //   isBefore = false;
      // }

      // // Don't replace items with themselves
      // if (dragCardId === hoverCardId) {
      //   return;
      // }

      // props.rankProjectCardColumn(
      //   {
      //     selectCard: monitor.getItem().issue,
      //     targetCard: props.issue,
      //     targetOrder: props.issue.get('order') - (isBefore ? 1 : -1),
      //     isBefore: isBefore,
      //     kanbanId: props.kanbanId
      //   },
      //   {
      //     temporary: false
      //   }
      // );
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
          issue: props.issue
        };
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(Card)
);
