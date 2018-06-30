// @flow
import React, { Component } from 'react';
import { UserAvatar } from '../../../components/UserAvatar/UserAvatar';
import { Checkbox } from 'antd';
import { getMouseElementInnerOffset } from '../../../utils/dom';
import { DragSource, ConnectDragSource } from 'react-dnd';

import './TaskCard.less';

const TaskCardSource = {
  beginDrag() {
    return {};
  }
};

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

  updateCard = (toPatchData: any) => {
    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.get('id'),
      ...toPatchData
    });
  };

  render() {
    const { card } = this.props;
    const { isDragging, connectDragSource, connectDragPreview } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    return (
      connectDragPreview &&
      connectDragSource &&
      connectDragPreview(
        <div style={{ opacity }}>
          {connectDragSource(
            <div className="task-card">
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
          )}
        </div>
      )
    );
  }
}
