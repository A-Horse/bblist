import './ProjectPage.scss';

import { History, Location } from 'history';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getProjectDetailRequest } from '../../../redux/actions/project.action';
import { RootState } from '../../../redux/reducer';
import { ProjectEpics } from './ProjectEpics/ProjectEpics';
import { ProjectKanban } from './ProjectKanban/ProjectKanban';
import { ProjectSetting } from './ProjectSetting/ProjectSetting';
import { ProjectSideBar } from './ProjectSideBar/ProjectSideBar';
import { Overview } from './ProjectOverview/Overview';
import { IProject } from '../../../typings/project.typing';
import { ProjectIssueList } from './ProjectIssueList/ProjectIssueList';
import { ProjectTeam } from './ProjectTeam/ProjectTeam';

interface Props {
  actions: {
    getProjectDetailRequest: (projectId: string) => void;
  };
  project: IProject;
  history: History;
  location: Location;
  match: match<{
    projectId: string;
  }>;
}

class ProjectPageComponent extends Component<
  Props,
  {
    loaded: boolean;
  }
> {
  state = {
    loaded: false,
  };

  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    this.props.actions.getProjectDetailRequest(projectId);
    this.setState({ loaded: true });
  }

  render() {
    const { projectId } = this.props.match.params;
    return (
      <div className="ProjectPage">
        <div className="ProjectPage--main">
          <ProjectSideBar projectId={projectId} />

          {this.state.loaded && (
            <div className="ProjectPage--right-content">
              <Switch>
                <Route
                  path="/project/:projectId/dashboard"
                  render={() => <Overview />}
                />
                <Route
                  path="/project/:projectId/setting"
                  render={() => {
                    if (!this.props.project) {
                      return null;
                    }
                    return <ProjectSetting />;
                  }}
                />
                <Route
                  path="/project/:projectId/kanban/:kanbanId"
                  render={() => <ProjectKanban />}
                />
                <Route
                  path="/project/:projectId/epics"
                  render={() => <ProjectEpics />}
                />
                <Route
                  path="/project/:projectId/issues"
                  render={() => <ProjectIssueList />}
                />
                <Route
                  path="/project/:projectId/team"
                  render={() => <ProjectTeam />}
                />
                <Route
                  path="*"
                  render={() => (
                    <Redirect to={`/project/${projectId}/dashboard`} />
                  )}
                />
              </Switch>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(
      {
        getProjectDetailRequest: getProjectDetailRequest,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state: RootState, props: Props) => {
  const { projectId } = props.match.params;
  return {
    project: state.project.projectMap[projectId],
  };
};

export const ProjectPage: any = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectPageComponent)
);

export default ProjectPage;
