//
import React, { Component } from 'react';
import { Route } from 'react-router';
import TaskTrack from '../../Track/Track';
import { CardDetailContainer } from '../../CardDetail/CardDetail.container';
import TrackCreater from '../../TrackCreater/TrackCreater';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../../actions/actions';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import './ColumnBoard.scss';

class ColumnBoardBase extends Component {
  state = {};
  trackInstanceMap = {};

  updateTaskTrackIndexs = () => {
    this.props.actions.UPDATE_TASK_TRACK_INDEX_REQUEST(
      {
        trackIndexs: Object.values(this.trackInstanceMap).map(track => {
          return track.getTrackIdAndIndex();
        })
      },
      { boardId: this.props.board.get('id') }
    );
  };

  render() {
    const { trackMap } = this.props;
    if (!this.props.board) {
      return null;
    }

    return (
      <div className="board-track-container">
        <Route path="/task-board/:id/card/:cardId" render={() => <CardDetailContainer />} />

        {trackMap
          .sort((a, b) => a.get('index') > b.get('index'))
          .toArray()
          .map(track => (
            <TaskTrack
              key={track.get('id')}
              ref={ref => {
                if (!ref) {
                  // TODO delete 耗性能
                  delete this.trackInstanceMap[trackMap.get('id')];
                } else {
                  this.trackInstanceMap[track.get('id')] = ref;
                }
              }}
              actions={this.props.actions}
              track={track}
              cards={this.props.cardMap.filter(card => card.get('taskTrackId') === track.get('id'))}
              addTaskCard={data =>
                this.props.actions.ADD_TASK_CARD_REQUEST({
                  boardId: +this.props.board.get('id'),
                  ...data
                })
              }
              updateTrack={data =>
                this.props.actions.UPDATE_TASK_TRACK_REQUEST({
                  boardId: +this.props.board.get('id'),
                  ...data
                })
              }
              destroyTrack={data =>
                this.props.actions.DESTORY_TASK_TRACK_REQUEST({
                  boardId: +this.props.board.get('id'),
                  ...data
                })
              }
              listId={track.get('id')}
              cardIds={track.get('cards')}
              history={this.props.history}
              match={this.props.match}
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
            })
          }
        />
      </div>
    );
  }
}

export const ColumnBoard = DragDropContext(HTML5Backend)(ColumnBoardBase);

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = state => {
  return {
    board: state.task2.get('board'),
    trackMap: state.task2.get('trackMap'),
    cardMap: state.task2.get('cardMap'),
    loginedUser: state.auth.get('loginedUser')
  };
};

export const ColumnBoardContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ColumnBoard)
);
