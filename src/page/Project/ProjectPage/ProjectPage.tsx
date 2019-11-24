import './ProjectPage.scss';

import React, { Component } from 'react';
import { match, Route, Switch } from 'react-router';
import { ProjectKanban } from './ProjectKanban/ProjectKanban';
import { ProjectSideBar } from './ProjectSideBar/ProjectSideBar';
import { getProjectDetailRequest } from '../../../actions/project/project.action';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { RootState } from '../../../reducers';
import { ProjectRecord } from '../../../typings/project.typing';
import { History, Location } from 'history';
import { ProjectAdmin } from './ProjectAdmin/ProjectAdmin';
import { ProjectEpics } from './ProjectEpics/ProjectEpics';
import { Issues } from './Issues/Issues';
import { ProjectHeaderBar } from './ProjectHeaderBar/ProjectHeaderBar';
import { ProjectSetting } from './ProjectSetting/ProjectSetting';

interface Props {
  actions: {
    getProjectDetailRequest: (projectId: string) => void;
  };
  project: ProjectRecord;
  history: History;
  location: Location;
  match: match<{
    projectId: string;
  }>;
}

class ProjectPageComponent extends Component<Props> {
  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    this.props.actions.getProjectDetailRequest(projectId);
  }

  componentWillReceiveProps(nextProps: any) {}

  render() {
    const { projectId } = this.props.match.params;
    const { project } = this.props;

    if (!project) {
      return null;
    }

    return (
      <div className="ProjectPage">
        <ProjectHeaderBar projectId={this.props.match.params.projectId} />

        <div className="ProjectPage--main">
          <ProjectSideBar match={this.props.match} />

          <div className="ProjectPage--right-content">
            <Switch>
              <Route path="/project/:projectId/setting" render={props => <ProjectSetting />} />
              <Route path="/project/:projectId/kanban/:kanbanId" render={props => <ProjectKanban />} />
              <Route path="/project/:projectId/kanban" render={props => <ProjectKanban />} /> 
              <Route path="/project/:projectId/epics" render={props => <ProjectEpics />} />
              <Route path="/project/:projectId/issues" render={props => <Issues />} />
              <Route path="/project/:projectId/admin" render={props => <ProjectAdmin />} />
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
  const { projectId } = props.match.params;

  return {
    project: state.project.get('projectMap').get(projectId) as ProjectRecord
  };
};

// TODO
export const ProjectPage: any = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectPageComponent)
);

export default ProjectPage;
