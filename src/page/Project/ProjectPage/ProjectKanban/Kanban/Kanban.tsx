import './Kanban.scss';

import { Record } from 'immutable';
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { TaskTrackNormalized } from '../../../../../typings/task/task-track.typing';
import { CardDetailContainer } from '../../../../Task/CardDetail/CardDetail.container';
import { KanbanColumn } from './Track/Track';
import TrackCreater from '../../../../Task/TrackCreater/TrackCreater';
import { ProjectRecord } from '../../../../../typings/project.typing';
import { KanbanRecord } from '../../../../../typings/kanban.typing';

interface InputProps {
  id: string;
  projectId: string;
}

interface ComponentProps extends RouteComponentProps, InputProps {}

class KanbanComponent extends Component<
  {
    actions: ActionCreatorsMapObject;
    project: ProjectRecord;
    kanban: KanbanRecord;
  } & ComponentProps
> {
  render() {
    if (this.props.kanban) {
      return;
    }

    const columns = this.props.kanban.get('columns');

    return (
      <div className="column-board-content-container">
        <Route
          path="/project/:projectId/kanban/:kanbanId/card/:cardId"
          render={() => <CardDetailContainer />}
        />

        <div className="board-track-container">
          {trackMap
            .sort((a: any, b: any) => a.get('order') > b.get('order'))
            .valueSeq()
            .toArray()
            .map((track: Record<TaskTrackNormalized>) => (
              <KanbanColumn
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

export const KanbanComponentDDC = DragDropContext(HTML5Backend)(KanbanComponent);

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

const mapStateToProps = (state: any, props: InputProps) => {
  const { projectId } = props;

  const project = state.project.get('projectMap').get(projectId) as ProjectRecord;

  let kanban: KanbanRecord;
  if (!project.get('kanbans')) {
  }

  return {
    project ,
    kanban
  };
};

export const Kanban = withRouter<ComponentProps>(connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanComponentDDC) as any);
