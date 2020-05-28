import './ProjectPage.scss';

import { History, Location } from 'history';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match, Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { getProjectDetailRequest } from '../../../redux/actions/project/project.action';
import { RootState } from '../../../redux/reducers';
import { ProjectRecord } from '../../../typings/project.typing';
import { Issues } from './Issues/Issues';
import { ProjectEpics } from './ProjectEpics/ProjectEpics';
import { ProjectKanban } from './ProjectKanban/ProjectKanban';
import { ProjectSetting } from './ProjectSetting/ProjectSetting';
import { ProjectSideBar } from './ProjectSideBar/ProjectSideBar';

interface Props {
  actions: {
    getProjectDetailRequest: (projectId: string) => void;
  };
  project: ProjectRecord;
  history: History;
  location: Location;
  match: match<{
    projectID: string;
  }>;
}

class ProjectPageComponent extends Component<Props> {
  componentDidMount() {
    const projectId = this.props.match.params.projectID;
    this.props.actions.getProjectDetailRequest(projectId);
  }

  render() {
    const { projectID } = this.props.match.params;
    return (
      <div className="ProjectPage">
        <div className="ProjectPage--main">
          <ProjectSideBar match={this.props.match} projectID={projectID} />

          <div className="ProjectPage--right-content">
            <Switch>
              <Route
                path="/project/:projectId/setting"
                render={() => <ProjectSetting />}
              />
              <Route
                path="/project/:projectId/kanban/:kanbanId"
                render={() => <ProjectKanban />}
              />
              <Route
                path="/project/:projectId/kanban"
                render={() => <ProjectKanban />}
              />
              <Route
                path="/project/:projectId/epics"
                render={() => <ProjectEpics />}
              />
              <Route
                path="/project/:projectId/issues"
                render={() => <Issues />}
              />
              <Route
                path="*"
                render={() => <Redirect to={`/project/${projectID}/kanban`} />}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(
      {
        getProjectDetailRequest: getProjectDetailRequest
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: RootState, props: Props) => {
  const { projectID } = props.match.params;

  return {
    project: state.project.get('projectMap').get(projectID) as ProjectRecord
  };
};

export const ProjectPage: any = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectPageComponent)
);

export default ProjectPage;
