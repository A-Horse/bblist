import './ProjectKanban.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch,
} from 'redux';
import { setProjectDefaultKanbanRequest } from '../../../../redux/actions/project/project-setting.action';
import { RootState } from '../../../../redux/reducers';
import { ProjectRecord } from '../../../../typings/project.typing';
import { Kanban } from './Kanban/Kanban';
import { KanbanHeaderBar } from './KanbanHeaderBar/KanbanHeaderBar';

interface Props {
  actions: ActionCreatorsMapObject;
  project?: ProjectRecord;
}

interface MatchParams {
  projectId: string;
  kanbanId: string;
  issueId: string;
}

export class ProjectKanbanComponent extends Component<
  Props & RouteComponentProps<MatchParams>,
  {
    selectKanbanId: string | null;
  }
> {
  state = {
    selectKanbanId: null,
  };

  onKanbanSelectChanged = (kanbanId: string): void => {
    this.props.history.push(
      `/project/${this.props.project!.get('id')}/kanban/${kanbanId}`
    );
  };

  render() {
    if (!this.props.project) {
      return <div>loading</div>;
    }

    if (!this.props.project.get('kanbans')) {
      return <div>loading</div>;
    }

    return (
      <div className="ProjectKanban">
        <KanbanHeaderBar
          projectID={this.props.project!.get('id')}
          selectedKanbanId={this.state.selectKanbanId!}
          onChange={this.onKanbanSelectChanged}
        />

        <Route
          path="/project/:projectId/kanban/:kanbanId"
          render={(props: RouteComponentProps<MatchParams>) => {
            return (
              <div className="ProjectKanban--kanban-container">
                <Kanban
                  kanbanId={this.state.selectKanbanId!}
                  projectId={this.props.project!.get('id')}
                />
              </div>
            );
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, xx) => {
  return {
    actions: bindActionCreators(
      {
        setProjectDefaultKanbanRequest: setProjectDefaultKanbanRequest,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state: RootState, props: any) => {
  const { projectId } = props.match.params;

  const project = state.project.get('projectMap').get(projectId);

  return {
    project,
  };
};

export const ProjectKanban = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectKanbanComponent)
);
