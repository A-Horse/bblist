import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import Input from '../../../components/widget/Input/Input';
import TaskCard from '../TaskCard/TaskCard';
import TaskCardCreater from '../CardCreater/CardCreater';
import { DropList } from 'components/widget/DropList/DropList';
import ClickOutSide from 'components/utils/ClickOutSide';
import { onTrackTopBarMouseDown } from './track-switch-helper';

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
    updateTrack: PropTypes.func.isRequired,
    addTaskCard: PropTypes.func.isRequired
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
    onTrackTopBarMouseDown(event, this);
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
