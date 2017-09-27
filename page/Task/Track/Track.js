import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import Input from '../../../components/widget/Input/Input';
import TaskCard from '../TaskCard/TaskCard';
import TaskCardCreater from '../CardCreater/CardCreater';
import { DropList } from 'components/widget/DropList/DropList';
import ClickOutSide from 'components/utils/ClickOutSide';

import { isEnterKey } from 'utils/keyboard';
// import BoardCradDragHelper from 'services/board-card-drag-helper';
import './Track.scss';

//let relativeOffsetBody;
// TODO auto get it
let relativeOffsetBody = 137;

export class Track extends Component {
  static propTypes = {
    cards: PropTypes.object.isRequired,
    track: PropTypes.object.isRequired,
    loginedUser: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    updateTrack: PropTypes.func.isRequired
  };

  state = {
    operationToggle: false
  };

  constructor(props) {
    super(props);
    this.resetDragMeta();
    this.addTaskCard = this.addTaskCard.bind(this);
  }

  componentWillMount() {
    this.cardInstanceMap = {};
  }

  componentDidMount() {
    if (!relativeOffsetBody) {
      relativeOffsetBody = true;
      /* relativeOffsetBody =
       *   getOffsetHeight(this.domMain, 'body') + +styleVariables.topBarHeight.replace('px', '');*/
    }
  }

  getTrackIdAndIndex() {
    return {
      id: this.props.track.get('id'),
      index: Number(this.domMain.dataset.index)
    };
  }

  pickCardInstance(cardConnectedInstance, id) {
    this.cardInstanceMap[id] = cardConnectedInstance;
    if (!cardConnectedInstance) {
      this.cardInstanceMap = R.omit([id], this.cardInstanceMap);
    }
  }

  onTopBarMouseDown(event) {
    // TODO 只需要在content里query
    const tracks = window.document.querySelectorAll('.task-track');
    const thisTrack = this.domMain;
    const movingTrack = thisTrack.cloneNode(true);

    // const trackOffsetLeft = thisTrack.offsetLeft;

    const pageContainer = window.document.body.querySelector('.board-container');

    const trackHorMargin = 14;
    const trackVerMargin = 15;

    thisTrack.classList.add('shadowing');

    const thisTrackRect = thisTrack.getBoundingClientRect();
    const thisTrackLeft = thisTrackRect.left;
    const thisTrackTop = thisTrackRect.top;
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

  resetDragMeta() {
    this.cardDragMeta = { placeholderCardIndex: -1 };
  }

  addTaskCard(data) {
    return this.props.addTaskCard({ trackId: +this.props.track.get('id'), ...data });
  }

  shouldComponentUpdate(newProps) {
    return !this.props.cards.equals(newProps.cards) || !this.props.track.equals(newProps.track);
  }

  render() {
    const { cards } = this.props;
    const { listName } = this.props;

    return (
      <div
        ref={ref => (this.domMain = ref)}
        data-index={this.props.dataIndex}
        className="task-track"
      >
        <div className="task-track--top-bar" onMouseDown={this.onTopBarMouseDown.bind(this)}>
          <div className="task-track--name">
            <Input
              className="task-track--input"
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

        <div className="task-track--body" ref="taskListBody">
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
