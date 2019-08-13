import './Kanban.scss';

import { Record } from 'immutable';
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { makeActionRequestCollection } from '../../../../../actions/actions';
import { TaskTrackNormalized } from '../../../../../typings/task/task-track.typing';
import { CardDetailContainer } from '../../../../Task/CardDetail/CardDetail.container';
import { TaskTrack } from '../../../../Task/Track/Track';
import TrackCreater from '../../../../Task/TrackCreater/TrackCreater';
import { ProjectRecord } from '../../../../../typings/project.typing';

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

const mapStateToProps = (state: any, props: any) => {
  const { projectId } = props.match.params;

  return {
    project: state.project.get('projectMap').get(projectId) as ProjectRecord
  };
};

export const Kanban = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ColumnBoard)
);
