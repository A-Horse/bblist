// @flow
import React, { Component } from 'react';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';
import { getMouseElementInnerOffset } from '../../../utils/dom';
import { Select, Modal as AntModal, Button, Form, Input, Checkbox } from 'antd';

import './TaskCard.scss';

class TaskCard extends Component<
  {
    card: any,
    actions: any,
    history: any,
    match: any
  },
  {}
> {
  state = {};

  constructor(props) {
    super(props);
    this.updateCard = this.updateCard.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  componentWillMount() {}

  onDragEnd() {
    document.body.removeChild(this.crt);
  }

  updateCard(toPatchData: any) {
    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.get('id'),
      ...toPatchData
    });
  }

  onLoad() {
    this.height = this.refs.main.offsetHeight;
    this.width = this.refs.main.offsetWidth;
  }

  checkBoxOnClick(event) {
    event.stopPropagation();
  }

  onMouseDown(event) {
    // TODO  尝试一下 react 的方法
    this.mouseMoving = false;

    event.preventDefault();
    event.stopPropagation();
    const tracks = window.document.querySelectorAll('.task-track');

    const thisCard = this.refs.main;

    const movingCard = thisCard.cloneNode(true);
    const pageContainer = window.document.body.querySelector('.board-page-container');

    const mouseOffsetInCard = getMouseElementInnerOffset(thisCard, event);

    const self = this;
    function onMouseMove(event) {
      if (!self.mouseMoving) {
        // 防止点击的时候还是出现 clone
        movingCard.style.height = thisCard.offsetHeight;
        movingCard.style.width = thisCard.offsetWidth;
        movingCard.style.position = 'absolute';
        movingCard.style.left = event.pageX + 'px';
        movingCard.style.top = event.pageY + 'px';

        window.document.body.appendChild(movingCard);
      }
      self.mouseMoving = true;
      const movingOffsetY = event.pageY;
      const movingOffsetX = event.pageX + pageContainer.scrollLeft;
      movingCard.style.left = '0';
      movingCard.style.top = '0';
      movingCard.style.transform = `translate(${movingOffsetX -
        mouseOffsetInCard.left}px, ${movingOffsetY - mouseOffsetInCard.top}px)`;
    }

    function onMouseUp(event) {
      window.document.body.removeEventListener('mousemove', onMouseMove);
      window.document.body.removeEventListener('mouseup', onMouseUp);
      if (self.mouseMoving) {
        window.document.body.removeChild(movingCard);
      }
    }
    window.document.body.addEventListener('mousemove', onMouseMove);
    window.document.body.addEventListener('mouseup', onMouseUp);
  }

  render() {
    const { card } = this.props;
    return (
      <div className="task-card" ref="main">
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

export default TaskCard;
