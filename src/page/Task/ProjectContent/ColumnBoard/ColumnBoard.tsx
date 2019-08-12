import React, { Component } from 'react';
import { Route } from 'react-router';
import { TaskTrack } from '../../Track/Track';
import { CardDetailContainer } from '../../CardDetail/CardDetail.container';
import TrackCreater from '../../TrackCreater/TrackCreater';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../../actions/actions';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { TaskTrackNormalized } from '../../../../typings/task/task-track.typing';
import { Record } from 'immutable';
import { BoardSideBar } from '../../../Project/ProjectPage/BoardSideBar/BoardSideBar';

import './ColumnBoard.scss';

// TODO rename
class ColumnBoardBase extends Component<any, any> {

  render() {
    const { trackMap } = this.props;
    if (!this.props.board) {
      return null;
    }

    return (
      <div className="column-board-content-container">
        <Route path="/task-board/:id/card/:cardId" render={() => <CardDetailContainer />} />

        <div className="board-track-container">
          {trackMap
            .sort((a: any, b: any) => a.get('order') > b.get('order'))
            .valueSeq()
            .toArray()
            .map((track: Record<TaskTrackNormalized>) => (
              <TaskTrack
                key={track.get('id')}
                actions={this.props.actions}
                track={track}
                cards={track.get('cards').map((id: string) => {
                  return this.props.cardMap.get(id);
                })}
                addTaskCard={(data: any) =>
                  this.props.actions.ADD_TASK_CARD_REQUEST({
                    boardId: this.props.board.get('id'),
                    ...data
                  })
                }
                updateTrack={(data: any) =>
                  this.props.actions.UPDATE_TASK_TRACK_REQUEST({
                    boardId: +this.props.board.get('id'),
                    ...data
                  })
                }
                destroyTrack={(data: any) =>
                  this.props.actions.DESTORY_TASK_TRACK_REQUEST({
                    boardId: +this.props.board.get('id'),
                    ...data
                  })
                }
                listId={track.get('id')}
                cardIds={track.get('cards')}
                history={this.props.history}
                match={this.props.match}
                loginedUser={this.props.loginedUser}
                boardId={this.props.board.get('id')}
              />
            ))}
          <TrackCreater
            addTrack={(data: any) =>
              this.props.actions.ADD_TASK_TRACK_REQUEST({
                boardId: this.props.board.get('id'),
                ...data
              })
            }
          />
        </div>
      </div>
    );
  }
}

export const ColumnBoard = DragDropContext(HTML5Backend)(ColumnBoardBase);

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = (state: any) => {
  return {
    board: state.task2.get('currentBoard'),
    trackMap: state.task2.get('trackMap'),
    cardMap: state.task2.get('cardMap'),
    loginedUser: state.auth.get('loginedUser')
  };
};

export const ColumnBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ColumnBoard));
