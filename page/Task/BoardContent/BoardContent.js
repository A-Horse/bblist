import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskTrack from '../Track/Track';
import DOM from 'react-dom-factories';
import { Route, Switch, Redirect } from 'react-router';

import CardDetail from '../CardDetail/CardDetail';
import TrackCreater from '../TrackCreater/TrackCreater';

import './BoardContent.scss';

class BoardContent extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object,
    history: PropTypes.object.isRequired,
    trackMap: PropTypes.object,
    cardMap: PropTypes.object,
    board: PropTypes.object,
    loginedUser: PropTypes.object
  };

  state = {
    typingNewList: false,
    boardSettingToggle: false
  };

  constructor(props) {
    super(props);
    this.trackInstanceMap = {};
    this.updateTaskTrackIndexs = this.updateTaskTrackIndexs.bind(this);
  }

  updateTaskTrackIndexs() {
    this.props.actions.UPDATE_TASK_TRACK_INDEX_REQUEST(
      {
        trackIndexs: Object.values(this.trackInstanceMap).map(track => {
          return track.getTrackIdAndIndex();
        })
      },
      { boardId: this.props.board.get('id') }
    );
  }

  render() {
    const { trackMap, cardMap } = this.props;
    if (!this.props.board) {
      return DOM.noscript();
    }

    console.log('========', this.props.cardMap);

    return (
      <div className="board-track-container">
        <Route
          path="/task-board/:id/card/:cardId"
          render={props => {
            console.log('+', props);
            return (
              <CardDetail
                {...props}
                actions={this.props.actions}
                board={this.props.board}
                trackMap={this.props.trackMap}
                card={this.props.cardMap.get(String(props.match.params.cardId))}
              />
            );
          }}
        />

        {trackMap
          .sort((a, b) => a.get('index') > b.get('index'))
          .toArray()
          .map(track => (
            <TaskTrack
              key={track.get('id')}
              ref={ref => {
                if (!ref) {
                  delete this.trackInstanceMap[trackMap.get('id')];
                } else {
                  this.trackInstanceMap[track.get('id')] = ref;
                }
              }}
              actions={this.props.actions}
              track={track}
              cards={track.get('cards').map(cardId => cardMap.get(String(cardId)))}
              addTaskCard={data =>
                this.props.actions.ADD_TASK_CARD_REQUEST({
                  boardId: +this.props.board.get('id'),
                  ...data
                })}
              updateTrack={data =>
                this.props.actions.UPDATE_TASK_TRACK_REQUEST({
                  boardId: +this.props.board.get('id'),
                  ...data
                })}
              destroyTrack={data =>
                this.props.actions.DESTORY_TASK_TRACK_REQUEST({
                  boardId: +this.props.board.get('id'),
                  ...data
                })}
              listId={track.get('id')}
              cardIds={track.get('cards')}
              history={this.props.history}
              updateTaskTrackIndexs={this.updateTaskTrackIndexs}
              loginedUser={this.props.loginedUser}
              boardId={this.props.board.get('id')}
            />
          ))}
        <TrackCreater
          addTrack={data =>
            this.props.actions.ADD_TASK_TRACK_REQUEST({
              boardId: this.props.board.get('id'),
              ...data
            })}
        />
      </div>
    );
  }
}

export default BoardContent;
