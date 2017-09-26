import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskTrack from '../Track/Track';
import { PageContainer } from 'components/widget/PageContainer';
import TrackCreater from '../TrackCreater/TrackCreater';
import DOM from 'react-dom-factories';

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
        trackIndexs: Object.values(this.trackInstanceMap).map(track => track.getTrackIdAndIndex())
      },
      { boardId: this.props.board.get('id') }
    );
  }

  render() {
    const { trackMap, cardMap } = this.props;
    if (!this.props.board) {
      return DOM.noscript();
    }

    return (
      <PageContainer className="board-page-container">
        <div className="board-track-container">
          {trackMap
            .sort((a, b) => a.get('index') > b.get('index'))
            .toArray()
            .map((track, index) => (
              <TaskTrack
                key={track.get('id')}
                ref={trackInstance => {
                  this.trackInstanceMap[track.get('id')] = trackInstance;
                }}
                actions={this.props.actions}
                dataIndex={index}
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
                listName={track.get('name')}
                history={this.props.history}
                updateTaskTrackIndexs={this.updateTaskTrackIndexs}
                loginedUser={this.props.loginedUser}
                wallId={this.props.board.get('id')}
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
        {/*         <CardModal key='card-modal'/> */}
      </PageContainer>
    );
  }
}

export default BoardContent;
