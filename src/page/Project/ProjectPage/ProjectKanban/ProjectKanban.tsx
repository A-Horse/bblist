import './ProjectKanban.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { ActionCreatorsMapObject, AnyAction, bindActionCreators, Dispatch } from 'redux';

import { getProjectKanbansRequest } from '../../../../actions/project/kanban.action';
import { setProjectDefaultKanbanRequest } from '../../../../actions/project/project-setting.action';
import { KanbanSelect } from '../../../../components/stateful-component/KanbanSelect/KanbanSelect';
import { RootState } from '../../../../reducers';
import { ProjectRecord } from '../../../../typings/project.typing';
import { SelectOption } from '../../../../typings/select.typing';
import { Kanban } from './Kanban/Kanban';
import { KanbanHeaderBar } from './KanbanHeaderBar/KanbanHeaderBar';
import { NoKanbanGuide } from './NoKanbanGuide/NoKanbanGuide';

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
    selectKanbanId: null
  };

  componentDidMount() {
    this.props.actions.getProjectKanbansRequest({
      projectId: this.props.match.params.projectId
    });
  }

  onKanbanSelectChanged = (kanbanId: string): void => {
    this.props.history.push(`/project/${this.props.project!.get('id')}/kanban/${kanbanId}`);

    if (!this.props.project!.get('setting').get('defaultKanbanId')) {
      this.props.actions.setProjectDefaultKanbanRequest({
        projectId: this.props.project!.get('id'),
        kanbanId
      });
    }
  };

  renderKanbanArea() {
    if (!this.props.project!.get('kanbans')!.length) {
      return <NoKanbanGuide project={this.props.project!} />;
    } else {
      const selectedKanbanId: string =
        this.state.selectKanbanId || this.props.project!.get('setting').get('defaultKanbanId');

      if (!!selectedKanbanId && selectedKanbanId !== this.props.match.params.kanbanId) {
        return <Redirect to={`/project/${this.props.project!.get('id')}/kanban/${selectedKanbanId}`} />;
      }

      return (
        <>
          <KanbanHeaderBar
            projectId={this.props.project!.get('id')}
            selectedKanbanId={selectedKanbanId}
            onChange={this.onKanbanSelectChanged}
          />

          <Route
            path="/project/:projectId/kanban/:kanbanId"
            render={(props: RouteComponentProps<MatchParams>) => {
              return (
                <div className="ProjectKanban--kanban-container">
                  <Kanban kanbanId={selectedKanbanId} projectId={this.props.project!.get('id')} />
                </div>
              );
            }}
          />
        </>
      );
    }
  }

  render() {
    if (!this.props.project) {
      return null;
    }

    if (!this.props.project.get('kanbans')) {
      return null;
    }

    return <div className="ProjectKanban">{this.renderKanbanArea()}</div>;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getProjectKanbansRequest: getProjectKanbansRequest,
        setProjectDefaultKanbanRequest: setProjectDefaultKanbanRequest
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: RootState, props: any) => {
  const { projectId } = props.match.params;

  const project = state.project.get('projectMap').get(projectId);

  return {
    project
  };
};

export const ProjectKanban = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectKanbanComponent));
