import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';


import TaskCard from './TaskCard';
import TaskCardCreater from './TaskCardCreater';
import CardPlaceholder from './CardPlaceholder';
import {deleteTaskWall, getTaskAllCards} from 'actions/task/task-wall';
import {createTaskList, deleteTaskList, updateTaskList} from 'actions/task/task-list';
import {updateTaskCard, insertVirtualCard} from 'actions/task/task-card';
import {Input} from 'components/widget/Input';
import {DropList} from 'components/widget/DropList';
import {ConfirmModal} from 'components/widget/ConfirmModal';
import {AddIcon, MoreIcon, EditIcon, ArrowDownIcon, SettingIcon, MIDDLE_SIZE, SMALL_SIZE} from 'services/svg-icons';
import {spawnMixinRender} from 'style/theme-render';
import GlobalClick from 'services/global-click';
import Textarea from 'react-textarea-autosize';
import {getOffsetHeight} from 'utils/dom';
import BoardCradDragHelper from 'services/board-card-drag-helper';

import 'style/page/task/task-list.scss';

import styleVariables from '!!sass-variable-loader!style/page/task/_task-variable.scss';


//let relativeOffsetBody;
// TODO auto get it
let relativeOffsetBody = 137;

class TaskList extends Component {
  constructor() {
    super();
    this.resetDragMeta();

  }

  componentWillMount() {
    // TODO rename
    this.state = {
      listSetting: {}
    };
    this.cardInstanceMap = {};
  }

  componentDidMount() {
    if (!relativeOffsetBody) {
      relativeOffsetBody = true;
      relativeOffsetBody = getOffsetHeight(this.refs.main, 'body') + +styleVariables.topBarHeight.replace('px', '');
    }
  }

  componentDidUpdate() {
    const {cardIds} = this.props;
  }

  getTrackIdIndex() {
    return {
      id: this.props.listId,
      index: Number(this.refs.main.dataset.index)
    };
  }

  onClickSetting(listId) {
    const obj = {};
    obj[listId] = !this.state.listSetting[listId];
    // TODO rename
    this.setState({listSetting: obj});
    // FIXME 诡异的实现
    GlobalClick.addGlobalClickHandleOnce(() => {
      const obj = {};
      obj[listId] = false;
      this.setState({
        listSetting: obj
      });
    });
  }

  onTrackNameChanged() {
    const {dispatch} = this.props;
    const {wallId, listId} = this.props;
    return dispatch(updateTaskList(wallId, listId, {name: this.refs.trackName.value.trim()}));
  }

  onTrackNameKeyDown(event) {
    if (event.keyCode === 13) {
      return event.preventDefault();
    }
  }

  pickCardInstance(cardConnectedInstance, id) {
    this.cardInstanceMap[id] = cardConnectedInstance;
    if (!cardConnectedInstance) {
      this.cardInstanceMap = R.omit([id], this.cardInstanceMap);
    }
  }

  renderCards(cardIds) {
    return cardIds.map(cardId => {
      return (
        <TaskCard ref={(cardConnectedInstance) => this.pickCardInstance(cardConnectedInstance, cardId)}
          key={cardId}
          boardId={this.props.wallId}
          cardId={cardId}/>
      );
    });
  }

  renderTrackName() {
    const {listName} = this.props;
    return (
      <div className='task-list--name'>
        <Input className='task-list--input' ref='trackName' onMouseDown={event => event.stopPropagation()} onKeyDown={this.onTrackNameKeyDown.bind(this)} onChange={this.onTrackNameChanged.bind(this)} defaultValue={listName}/>
      </div>
    );
  }

  renderTopBar() {
    const {listId} = this.props;
    return (
      <div className='task-list--top-bar' onMouseDown={this.onTopBarMouseDown.bind(this)}>
        {this.renderTrackName()}

        <MoreIcon className='more-icon icon' onClick={() => this.onClickSetting(listId)}/>
          <DropList toggle={this.state.listSetting[listId]}>
            <ul>
              <li onClick={() => this.refs.listDeleteConfirm.open()}>Delete</li>
            </ul>
          </DropList>

          <ConfirmModal confirmFn={() => deleteTaskList(listId)} ref='listDeleteConfirm' ></ConfirmModal>
      </div>
    );
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
    const thisTrackLeft = thisTrackRect.left, thisTrackTop = thisTrackRect.top;
    const trackOuterWidth = thisTrackRect.width + trackHorMargin * 2;

    // TODO getMouseElementInnerOffset
    const thisTrackMouseOffset = {left: event.pageX - thisTrackLeft, top: event.pageY - thisTrackTop};

    movingTrack.classList.add('moving');
    movingTrack.style.height = thisTrack.offsetHeight + 'px';
    movingTrack.style.width = thisTrack.offsetWidth + 'px';
    movingTrack.style.top = thisTrackRect.top - trackVerMargin + 'px';

    let currentTrackIndex = Number(thisTrack.dataset.index);

    function onMouseMove(event) {
      const movingOffset = event.pageX + pageContainer.scrollLeft - thisTrackMouseOffset.left - trackHorMargin;
      movingTrack.style.transform = `translate(${movingOffset}px, 0)`;

      const mouseMovingOffset = event.pageX + pageContainer.scrollLeft;

      const ii = Math.floor(mouseMovingOffset / trackOuterWidth);

      if (ii === currentTrackIndex) {
        return;
      }

      if (ii - currentTrackIndex === 1) {
        tracks.forEach((track) => {
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
        tracks.forEach((track) => {
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

    const movingOffset = event.pageX + pageContainer.scrollLeft - thisTrackMouseOffset.left - trackHorMargin + 'px';
    movingTrack.style.transform = `translate(${movingOffset}, 0)`;

    window.document.body.addEventListener('mousemove', onMouseMove);
    window.document.body.addEventListener('mouseup', onMouseUp);
    // TODO body onblur
  }

  render() {
    const {listId, cardIds} = this.props;
    return (
      <div ref='main'
           data-index={this.props.dataIndex}
           className='task-list'

           onDragEnter={this.onDragEnter.bind(this)}
           onDrop={this.onDrop.bind(this)}
           onDragLeave={this.onDragLeave.bind(this)}
           onDragOver={this.onDragOver.bind(this)}>
        {this.renderTopBar()}

        <div className='task-list--body' ref='taskListBody'>
          {this.renderCards(cardIds)}
          <TaskCardCreater wallId={this.props.wallId} listId={listId} />
        </div>

      </div>
    );
  }

  caluMovingPosition(mousePosition, dragInfo) {
    // 滚动情况
    const {cardIds} = this.props;
    const {y} = mousePosition;
    const {normalizedCard} = this.props;
    // TODO rename
    let xheight = relativeOffsetBody, i = 0;

    if (y < xheight) {
      return i;
    }

    let cardHeigths = [];
    cardIds.forEach((cardId, index) => {
      const cardInstance = this.cardInstanceMap[cardId].getWrappedInstance();
      if (this.cardDragMeta.hasPalceHolderCard && index === this.cardDragMeta.placeholderCardIndex) {
        cardHeigths.push(dragInfo.height);
      }
      cardHeigths.push(cardInstance.height);
    });

    for (let max = cardHeigths.length; i < max; ++i) {
      xheight += cardHeigths[i] + 6;// TODO const margin 6px
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
    this.cardDragMeta = {placeholderCardIndex: -1};
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
    const mousePosition = {x: event.nativeEvent.clientX, y: event.nativeEvent.clientY};
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
      this.refs.taskListBody.insertBefore(div, this.refs.taskListBody.querySelectorAll('.task-card')[placeHolderCardIndex].nextSibling);
    } else {
      this.refs.taskListBody.insertBefore(div, this.refs.taskListBody.querySelectorAll('.task-card')[placeHolderCardIndex]);
    }
  }

  requestMoveCardToThisList(card) {
    const thisListId = this.props.listId;
    return updateTaskCard(card.id, {listId: thisListId});
  }
}

const mapStateToProps = (state) => {
  return {
    normalizedTrack: state.task.list
  };
};

export default connect(mapStateToProps, null, null, {withRef: true})(TaskList);
