import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import Input from '../../../components/widget/Input/Input';
import { MoreIcon, AddIcon } from 'services/svg-icons';
import TaskCard from '../TaskCard/TaskCard';
import TaskCardCreater from '../CardCreater/CardCreater';
import { deleteTaskList } from 'actions/task/task-list';
import { DropList } from 'components/widget/DropList/DropList';
import ClickOutSide from 'components/utils/ClickOutSide';

import { isEnterKey } from 'utils/keyboard';

import GlobalClick from 'services/global-click';
import BoardCradDragHelper from 'services/board-card-drag-helper';

// import 'style/page/task/task-list.scss';
import './Track.scss';

import styleVariables from '!!sass-variable-loader!style/page/task/_task-variable.scss';

//let relativeOffsetBody;
// TODO auto get it
let relativeOffsetBody = 137;

export class Track extends Component {
  state = {
    operationToggle: false
  };

  constructor(props) {
    super(props);
    this.resetDragMeta();
    this.addTaskCard = this.addTaskCard.bind(this);
    // this.onTrackNameKeyDown = this.onTrackNameKeyDown.bind(this);
    // this.onTrackNameChanged = this.onTrackNameChanged.bind(this);
  }

  componentWillMount() {
    this.cardInstanceMap = {};
  }

  componentDidMount() {
    if (!relativeOffsetBody) {
      relativeOffsetBody = true;
      relativeOffsetBody =
        getOffsetHeight(this.refs.main, 'body') + +styleVariables.topBarHeight.replace('px', '');
    }
  }

  componentDidUpdate() {
    const { cardIds } = this.props;
  }

  getTrackIdIndex() {
    return {
      id: this.props.listId,
      index: Number(this.refs.main.dataset.index)
    };
  }

  pickCardInstance(cardConnectedInstance, id) {
    this.cardInstanceMap[id] = cardConnectedInstance;
    if (!cardConnectedInstance) {
      this.cardInstanceMap = R.omit([id], this.cardInstanceMap);
    }
  }

  onTopBarMouseDown(event) {
    const tracks = window.document.querySelectorAll('.task-list');
    const thisTrack = this.refs.main;
    const movingTrack = thisTrack.cloneNode(true);

    const trackOffsetLeft = thisTrack.offsetLeft;

    const pageContainer = window.document.body.querySelector('.board-page-container');
    const trackHorMargin = 24;
    const trackVerMargin = 15;

    thisTrack.classList.add('shadowing');

    const thisTrackRect = thisTrack.getBoundingClientRect();
    const thisTrackLeft = thisTrackRect.left,
      thisTrackTop = thisTrackRect.top;
    const trackOuterWidth = thisTrackRect.width + trackHorMargin * 2;

    // TODO getMouseElementInnerOffset
    const thisTrackMouseOffset = {
      left: event.pageX - thisTrackLeft,
      top: event.pageY - thisTrackTop
    };

    movingTrack.classList.add('moving');
    movingTrack.style.height = thisTrack.offsetHeight + 'px';
    movingTrack.style.width = thisTrack.offsetWidth + 'px';
    movingTrack.style.top = thisTrackRect.top - trackVerMargin + 'px';

    let currentTrackIndex = Number(thisTrack.dataset.index);

    function onMouseMove(event) {
      const movingOffset =
        event.pageX + pageContainer.scrollLeft - thisTrackMouseOffset.left - trackHorMargin;
      movingTrack.style.transform = `translate(${movingOffset}px, 0)`;

      const mouseMovingOffset = event.pageX + pageContainer.scrollLeft;

      const ii = Math.floor(mouseMovingOffset / trackOuterWidth);

      if (ii === currentTrackIndex) {
        return;
      }

      if (ii - currentTrackIndex === 1) {
        tracks.forEach(track => {
          const trackDataIndex = Number(track.dataset.index);
          if (trackDataIndex === currentTrackIndex) {
            const currentTransformLeft = Number(track.dataset.transformLeft) || 0;
            track.dataset.transformLeft = currentTransformLeft + trackOuterWidth;
            track.dataset.index = trackDataIndex + 1;
            track.style.transform = `translate(${currentTransformLeft + trackOuterWidth}px, 0)`;
          }
          if (trackDataIndex === ii) {
            const currentTransformLeft = Number(track.dataset.transformLeft) || 0;
            track.dataset.transformLeft = currentTransformLeft - trackOuterWidth;
            track.dataset.index = trackDataIndex - 1;
            track.style.transform = `translate(${currentTransformLeft - trackOuterWidth}px, 0)`;
          }
        });
        currentTrackIndex = ii;
      } else if (currentTrackIndex - ii === 1) {
        tracks.forEach(track => {
          const trackDataIndex = Number(track.dataset.index);
          if (trackDataIndex === currentTrackIndex) {
            const currentTransformLeft = Number(track.dataset.transformLeft) || 0;
            track.dataset.transformLeft = currentTransformLeft - trackOuterWidth;
            track.dataset.index = trackDataIndex - 1;
            track.style.transform = `translate(${currentTransformLeft - trackOuterWidth}px, 0)`;
          }
          if (trackDataIndex === ii) {
            const currentTransformLeft = Number(track.dataset.transformLeft) || 0;
            track.dataset.transformLeft = currentTransformLeft + trackOuterWidth;
            track.dataset.index = trackDataIndex + 1;
            track.style.transform = `translate(${currentTransformLeft + trackOuterWidth}px, 0)`;
          }
        });
        currentTrackIndex = ii;
      }
    }

    const self = this;
    function onMouseUp() {
      thisTrack.classList.remove('shadowing');
      window.document.body.removeChild(movingTrack);
      window.document.body.removeEventListener('mousemove', onMouseMove);
      window.document.body.removeEventListener('mouseup', onMouseUp);

      self.props.updateTaskTrackIndexs();
    }

    window.document.body.appendChild(movingTrack);

    const movingOffset =
      event.pageX + pageContainer.scrollLeft - thisTrackMouseOffset.left - trackHorMargin + 'px';
    movingTrack.style.transform = `translate(${movingOffset}, 0)`;

    window.document.body.addEventListener('mousemove', onMouseMove);
    window.document.body.addEventListener('mouseup', onMouseUp);
    // TODO body onblur
  }

  caluMovingPosition(mousePosition, dragInfo) {
    // 滚动情况
    const { cardIds } = this.props;
    const { y } = mousePosition;
    const { normalizedCard } = this.props;
    // TODO rename
    let xheight = relativeOffsetBody,
      i = 0;

    if (y < xheight) {
      return i;
    }

    let cardHeigths = [];
    cardIds.forEach((cardId, index) => {
      const cardInstance = this.cardInstanceMap[cardId].getWrappedInstance();
      if (
        this.cardDragMeta.hasPalceHolderCard &&
        index === this.cardDragMeta.placeholderCardIndex
      ) {
        cardHeigths.push(dragInfo.height);
      }
      cardHeigths.push(cardInstance.height);
    });

    for (let max = cardHeigths.length; i < max; ++i) {
      xheight += cardHeigths[i] + 6; // TODO const margin 6px
      if (y < xheight) {
        return i;
      }
    }
    return --i;
  }

  removePlaceHolderCard() {
    if (this.cardDragMeta.hasPalceHolderCard) {
      this.refs.taskListBody.removeChild(this.cardDragMeta.placeholderCard);
      this.cardDragMeta.hasPalceHolderCard = false;
    }
  }

  addDragingClass() {
    this.refs.main.className += ' has-draging-card';
  }

  removeDragingClass() {
    this.refs.main.className = this.refs.main.className.replace(/\s?has-draging-card/, '');
  }

  resetDragMeta() {
    this.cardDragMeta = { placeholderCardIndex: -1 };
  }

  createPlaceHolderCard(dragingCardInfo) {
    const phcard = document.createElement('div');
    phcard.className = 'task-card task-card-placeholder';
    phcard.style.height = dragingCardInfo.height + 'px';
    phcard.style.width = dragingCardInfo.width + 'px';
    return phcard;
  }

  onDragLeave() {
    this.removeDragingClass();
    this.removePlaceHolderCard();
  }

  onDragEnter() {
    this.addDragingClass();
  }

  onDrop() {
    this.removePlaceHolderCard();
    this.removeDragingClass();
    this.resetDragMeta();
  }

  onDragOver(event) {
    event.preventDefault();
    const mousePosition = { x: event.nativeEvent.clientX, y: event.nativeEvent.clientY };
    const dragingCardInfo = BoardCradDragHelper.getData('info');

    const placeHolderCardIndex = this.caluMovingPosition(mousePosition, dragingCardInfo);
    if (placeHolderCardIndex === this.cardDragMeta.placeholderCardIndex) {
      return;
    }
    this.cardDragMeta.placeholderCardIndex = placeHolderCardIndex;
    this.removePlaceHolderCard();

    const div = this.createPlaceHolderCard(dragingCardInfo);
    this.cardDragMeta.placeholderCard = div;
    this.cardDragMeta.hasPalceHolderCard = true;

    if (placeHolderCardIndex === this.props.cardIds.length) {
      this.refs.taskListBody.insertBefore(
        div,
        this.refs.taskListBody.querySelectorAll('.task-card')[placeHolderCardIndex].nextSibling
      );
    } else {
      this.refs.taskListBody.insertBefore(
        div,
        this.refs.taskListBody.querySelectorAll('.task-card')[placeHolderCardIndex]
      );
    }
  }

  requestMoveCardToThisList(card) {
    const thisListId = this.props.listId;
    return updateTaskCard(card.id, { listId: thisListId });
  }

  addTaskCard(data) {
    return this.props.addTaskCard({ trackId: +this.props.track.get('id'), ...data });
  }

  render() {
    const { track, cards } = this.props;
    const { listName } = this.props;
    console.log(track, track.get('name'));

    return (
      <div
        ref="main"
        data-index={this.props.dataIndex}
        className="task-list"
        onDragEnter={this.onDragEnter.bind(this)}
        onDrop={this.onDrop.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
        onDragOver={this.onDragOver.bind(this)}
      >
        <div className="task-list--top-bar" onMouseDown={this.onTopBarMouseDown.bind(this)}>
          <div className="task-list--name">
            <Input
              className="task-list--input"
              ref="trackName"
              onMouseDown={event => event.stopPropagation()}
              onKeyDown={event => {
                isEnterKey(event) && event.preventDefault();
              }}
              onChange={name =>
                this.props.updateTrack({
                  trackId: this.props.track.get('id'),
                  name
                })}
              defaultValue={listName}
            />
          </div>

          <i
            className="fa fa-ellipsis-h"
            aria-hidden="true"
            onMouseDown={event => event.stopPropagation()}
            onClick={event => {
              event.stopPropagation();
              this.setState({ operationToggle: !this.state.operationToggle });
            }}
          />

          <DropList
            className="task-track-operation"
            toggle={this.state.operationToggle}
            onMouseDown={event => event.stopPropagation()}
          >
            <ClickOutSide
              onClickOutside={event => {
                event.stopPropagation();
                this.setState({ operationToggle: false });
              }}
            >
              <li
                className="task-track-operation--remove"
                onClick={() => this.props.destroyTrack({ trackId: this.props.track.get('id') })}
              >
                <i className="fa fa-trash" aria-hidden="true" />
                <span>Delete</span>
              </li>
            </ClickOutSide>
          </DropList>
        </div>

        <div className="task-list--body" ref="taskListBody">
          <div>
            {cards.map(card => {
              return (
                <TaskCard
                  ref={cardConnectedInstance =>
                    this.pickCardInstance(cardConnectedInstance, card.get('id'))}
                  actions={this.props.actions}
                  key={card.get('id')}
                  boardId={this.props.wallId}
                  card={card}
                />
              );
            })}
          </div>
          <TaskCardCreater loginedUser={this.props.loginedUser} addTaskCard={this.addTaskCard} />
        </div>
      </div>
    );
  }
}
export default Track;
