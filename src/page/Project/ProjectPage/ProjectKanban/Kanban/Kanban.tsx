import './Kanban.scss';

import { Record, List } from 'immutable';
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
import { KanbanColumnRecord } from '../../../../../typings/kanban-column.typing';
import Loading from '../../../../../components/Loading';

interface InputProps {
  id: string;
  projectId: string;
}

interface ComponentProps extends RouteComponentProps, InputProps {}

class KanbanComponent extends Component<
  {
    actions: ActionCreatorsMapObject;
    project: ProjectRecord;
    kanban?: KanbanRecord;
  } & ComponentProps
> {
  render() {
    if (!this.props.kanban) {
      return <Loading />;
    }

    if (!this.props.kanban!.get('columns')) {
      return <Loading />;
    }

    const columns: List<KanbanColumnRecord> = this.props.kanban!.get('columns')!;

    return (
      <div className="column-board-content-container">
        <Route
          path="/project/:projectId/kanban/:kanbanId/card/:cardId"
          render={() => <CardDetailContainer />}
        />

        <div className="board-track-container">
          {columns
            .sort((a: KanbanColumnRecord, b: KanbanColumnRecord) => a.get('order') - b.get('order'))
            .valueSeq()
            .toArray()
            .map((kanbanColumnRecord: KanbanColumnRecord) => (
              <KanbanColumn
                key={kanbanColumnRecord.get('id')}
              />
            ))}

          <TrackCreater
            addTrack={(data: any) =>
              this.props.actions.ADD_TASK_TRACK_REQUEST({
                boardId: this.props.kanban!.get('id'),
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

const mapStateToProps = (state: any, props: ComponentProps) => {
  const { projectId } = props;

  const project = state.project.get('projectMap').get(projectId) as ProjectRecord;

  let kanban: KanbanRecord | undefined;
  if (project.get('kanbans')) {
    kanban = project.get('kanbans')!.find((k: KanbanRecord) => {
      return k.get('id') === props.id;
    });
  }

  return {
    project,
    kanban
  };
};

export const Kanban = withRouter<ComponentProps>(connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanComponentDDC) as any);
