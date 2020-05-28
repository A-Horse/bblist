import './ProjectIssue.scss';

import React, {
  RefForwardingComponent,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  ConnectDragSource,
  ConnectDropTarget,
  DragSource,
  DropTarget,
  DropTargetMonitor,
  XYCoord,
} from 'react-dnd';

import {
  ProjectIssueRecord,
  RankProjectCardInKanbanInput,
} from '../../../../typings/project-issue.typing';
import { IssueId } from '../IssueId/IssueId';

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

type IssueComponent = RefForwardingComponent<
  HTMLDivElement,
  InputProps & DndProps
>;

const Card = React.forwardRef<HTMLDivElement, InputProps & DndProps>(
  (
    { issue, isDragging, onClick, connectDragSource, connectDropTarget },
    ref
  ) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);

    const opacity = isDragging ? 0.2 : 1;
    useImperativeHandle<{}, CardInstance>(ref, () => ({
      getNode: () => elementRef.current,
    }));

    const innerOnClick = () => {
      onClick && onClick(issue.get('id'));
    };

    return (
      <div
        onClick={innerOnClick}
        className="ProjectIssue"
        ref={elementRef}
        style={{ opacity }}
      >
        <IssueId id={issue.get('id')} />
        <div className="ProjectIssue--title">{issue.get('title')}</div>
      </div>
    );
  }
);

// TODO: rename KanbanIssue
export const ProjectIssue = DropTarget(
  'CARD',
  {
    hover(
      props: InputProps,
      monitor: DropTargetMonitor,
      component: CardInstance
    ) {
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
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

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
          targetOrder:
            props.issue.get('order') - (isBefore ? 0.000001 : -0.0000001),
          targetColumnId: props.issue.get('columnID'),
          isBefore: isBefore,
          kanbanId: props.kanbanId,
        } as RankProjectCardInKanbanInput,
        {
          temporary: true,
        }
      );
    },
    drop(
      props: InputProps,
      monitor: DropTargetMonitor,
      component: IssueComponent
    ) {
      props.rankProjectCardColumn(
        {
          selectCard: monitor.getItem().issue,
          kanbanId: props.kanbanId,
          targetColumnId: props.issue.get('columnID'),
        } as RankProjectCardInKanbanInput,
        {
          temporary: false,
        }
      );
    },
  },
  (connect, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(
  DragSource(
    'CARD',
    {
      beginDrag(props: any, monitor: any, component: IssueComponent) {
        return {
          issue: props.issue,
        };
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(Card)
);
