import React, { Component } from 'react';
import R from 'ramda';
import TaskTrack from '../Track/Track';
import CardModal from '../CardModal';
import { PageContainer } from 'components/widget/PageContainer';
import { SettingIcon } from 'services/svg-icons';
import TrackCreater from '../TrackCreater/TrackCreater';

import './BoardContent.scss';

const styles = {
  settingIcon: {
    fill: 'white',
    verticalAlign: 'middle'
  },
  settingContainer: {
    display: 'block'
  },
  listContainer: {
    position: 'relative',
    justifyContent: 'center',
    height: '100%',
    whiteSpace: 'nowrap'
  }
};

class BoardContent extends Component {
  constructor() {
    super();
    this.state = {
      typingNewList: false,
      boardSettingToggle: false
    };

    this.trackInstanceMap = {};
    this.updateTaskTrackIndexs = this.updateTaskTrackIndexs.bind(this);
  }

  updateTaskTrackIndexs() {
    const trackIndexs = Object.values(this.trackInstanceMap).map(track =>
      track.getWrappedInstance().getTrackIdIndex()
    );
    this.props.actions.updateTaskTrackIndex(this.props.match.id, trackIndexs);
  }

  render() {
    const { trackMap } = this.props;
    return (
      <PageContainer className="board-page-container">
        <div className="board-track-container" style={styles.listContainer}>
          {trackMap.toArray().map((track, index) => {
            return (
              <TaskTrack
                key={track.get('id')}
                ref={trackInstance => {
                  this.trackInstanceMap[track.get('id')] = trackInstance;
                }}
                actions={this.props.actions}
                dataIndex={index}
                track={track}
                addTaskCard={data =>
                  this.props.actions.ADD_TASK_CARD_REQUEST({
                    boardId: +this.props.board.get('id'),
                    ...data
                  })}
                destroyTrack={data =>
                  this.props.actions.DESTORY_TASK_TRACK_REQUEST({
                    boardId: +this.props.board.get('id'),
                    ...data
                  })}
                listId={track.get('id')}
                cardMap={this.props.cardMap}
                cardIds={track.get('cards')}
                listName={track.get('name')}
                history={this.props.history}
                updateTaskTrackIndexs={this.updateTaskTrackIndexs}
                loginedUser={this.props.loginedUser}
                wallId={this.props.history.id}
              />
            );
          })}
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
