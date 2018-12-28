//
import React, { Component } from 'react';
import { UserAvatar } from '../../../components/UserAvatar/UserAvatar';
import { Checkbox } from 'antd';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import './TaskCard.scss';

const TaskCardSource = {
  beginDrag(props, monitor, component) {
    const componentRect = findDOMNode(component).getBoundingClientRect();
    return {
      card: props.card,
      height: componentRect.height
    };
  }
};

class TaskCardBase extends Component {
  state = {};

  componentWillMount() {}

  componentWillReceiveProps() {}

  updateCard = toPatchData => {
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
                <div className={`task-card ${this.props.mode === 'LONG' ? 'long' : ''}`}>
                  {card.get('type') === 'TODO' && (
                    <Checkbox
                      checked={card.get('status') === 'DONE'}
                      onChange={event =>
                        this.updateCard({
                          status: event.target.checked ? 'DONE' : 'UNDONE'
                        })
                      }
                    />
                  )}
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

export const TaskCard = DropTarget(
  'CARD',
  {
    drop(props, monitor, component) {
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
)(
  DragSource('CARD', TaskCardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))(TaskCardBase)
);
