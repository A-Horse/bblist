// @flow
import React, { Component } from 'react';
import { UserAvatar } from '../../../components/UserAvatar/UserAvatar';
import { Checkbox } from 'antd';
import { getMouseElementInnerOffset } from '../../../utils/dom';
import { DragSource, DropTarget, ConnectDragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { Map } from 'immutable';

import './TaskCard.less';

const TaskCardSource = {
  beginDrag(props, monitor, component) {
    const componentRect = findDOMNode(component).getBoundingClientRect();
    return {
      card: props.card,
      height: componentRect.height
    };
  }
};

@DropTarget(
  'CARD',
  {
    drop(props, monitor, component) {
      console.log(component);
      /* component.onTaskCardDrop(props.card); */
      props.actions.CARD_MOVE_REQUEST({
        sourceCard: monitor.getItem().card.toJS(),
        targetCard: props.card.toJS()
      });
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
)
@DragSource('CARD', TaskCardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export class TaskCard extends Component<
  {
    card: any,
    actions: any,
    history: any,
    match: any
  },
  {}
> {
  state = {};

  componentWillMount() {}

  componentWillReceiveProps(newProps) {}

  updateCard = (toPatchData: any) => {
    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.get('id'),
      ...toPatchData
    });
  };

  render() {
    const { card } = this.props;
    const { isDragging, connectDragSource, connectDragPreview } = this.props;
    const { isOver, canDrop, connectDropTarget } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    return (
      connectDragPreview &&
      connectDragSource &&
      connectDragPreview(
        connectDropTarget(
          <div style={{ opacity }}>
            {connectDragSource(
              <div>
                <div className="task-card">
                  {card.get('id')}
                  <Checkbox
                    checked={card.get('isDone')}
                    onChange={event => this.updateCard({ isDone: event.target.checked })}
                  />
                  <p
                    className="task-card--title"
                    onClick={() => {
                      this.props.history.push(this.props.match.url + `/card/${card.get('id')}`);
                    }}
                  >
                    {card.get('title')}
                  </p>
                  <UserAvatar user={card.get('creater').toJS()} />
                </div>
                <div
                  style={{
                    height:
                      this.props.sourceItem && this.props.isOver && this.props.canDrop
                        ? this.props.sourceItem.height
                        : 0
                  }}
                  className={`task-card-placeholder${
                    this.props.isOver && this.props.canDrop ? ' active' : ''
                  }`}
                />
              </div>
            )}
          </div>
        )
      )
    );
  }
}
