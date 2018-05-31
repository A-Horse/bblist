// @flow
import React, { Component } from 'react';
import { UserAvatar } from '../../../components/UserAvatar/UserAvatar';
import { Checkbox } from 'antd';
import { getMouseElementInnerOffset } from '../../../utils/dom';

import './TaskCard.scss';

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

  onMouseDown = event => {
    // NOTE 通过 element 判断 taskcard, 取index更新
    return;
    event.preventDefault();
    event.stopPropagation();
    const tracks = window.document.querySelectorAll('.task-track');

    const thisCard = this.refs.main;

    const movingCard = thisCard.cloneNode(true);
    const pageContainer = window.document.body.querySelector('.board-track-container');

    const mouseOffsetInCard = getMouseElementInnerOffset(thisCard, event);

    const self = this;
    function onMouseMove(event) {
      if (!self.mouseMoving) {
        // 防止点击的时候还是出现 clone
        movingCard.style.height = thisCard.offsetHeight;
        movingCard.style.width = thisCard.clientWidth;
        movingCard.style.position = 'absolute';
        movingCard.style.zIndex = '99999';
        movingCard.style.left = event.pageX + 'px';
        movingCard.style.top = event.pageY + 'px';

        window.document.body.appendChild(movingCard);
      }
      const movingOffsetY = event.pageY;
      const movingOffsetX = event.pageX + pageContainer.scrollLeft;
      movingCard.style.left = '0';
      movingCard.style.top = '0';
      movingCard.style.transform = `translate(${movingOffsetX -
        mouseOffsetInCard.left}px, ${movingOffsetY - mouseOffsetInCard.top}px)`;
    }

    function onMouseUp(event: Event) {
      window.document.body.removeEventListener('mousemove', onMouseMove);
      window.document.body.removeEventListener('mouseup', onMouseUp);
      window.document.body.removeChild(movingCard);
    }

    window.document.body.addEventListener('mousemove', onMouseMove);
    window.document.body.addEventListener('mouseup', onMouseUp);
  };

  render() {
    const { card } = this.props;
    return (
      <div className="task-card" ref="main" onMouseDown={this.onMouseDown}>
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
    );
  }
}
