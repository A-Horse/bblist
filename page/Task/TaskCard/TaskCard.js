import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { openTaskCardModal } from 'actions/event/task-wall';
import UserAvatar from 'components/UserAvatar';
import { CheckBox } from 'components/widget/CheckBox/CheckBox';
import { getMouseElementInnerOffset } from 'utils/dom';
import { browserHistory } from 'react-router';

import './TaskCard.scss';

class TaskCard extends Component {
  static propTypes = {
    card: PropTypes.object.isRequired
  };

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

  openTaskCardModal() {
    return dispatch(openTaskCardModal(this.props.card));
  }

  /* updateDone() {
   *   const isDone = this.refs.checkbox.checked;
   *   this.updateTaskCard({ isDone });
   * }*/

  updateCard(toPatchData) {
    /* const { dispatch } = this.props;
     * return dispatch(updateTaskCard(this.props.cardId, data));*/
    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.get('id'),
      ...toPatchData
    });
  }

  onLoad() {
    this.height = this.refs.main.offsetHeight;
    this.width = this.refs.main.offsetWidth;
  }

  onClick(event) {
    browserHistory.push(`/task-board/${this.props.boardId}/${this.props.cardId}`);
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
        <CheckBox
          ref="checkbox"
          defaultChecked={card.get('isDone')}
          onChange={checked => this.updateCard({ isDone: checked })}
        />
        <p className="task-card--title">{card.get('title')}</p>
        <UserAvatar user={card.get('creater').toJS()} />
      </div>
    );
  }
}

export default TaskCard;
