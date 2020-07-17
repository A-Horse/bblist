import './ProjectPage.scss';

import { History, Location } from 'history';
import React, {Component, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {match, Redirect, Route, Switch, useRouteMatch, withRouter} from 'react-router-dom';
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
import {getProjectKanbansRequest} from "../../../redux/actions/kanban.action";

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

export default function ProjectPage() {
  const match = useRouteMatch<{ projectId: string }>();
  const projectId = match.params.projectId;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectDetailRequest(projectId))
    dispatch(getProjectKanbansRequest({projectId}))

  }, [dispatch]);


  return (
      <div className="ProjectPage">
        <div className="ProjectPage--main">
          <ProjectSideBar projectId={projectId} />

          { (
              <div className="ProjectPage--right-content">
                <Switch>
                  <Route
                      path="/project/:projectId/dashboard"
                      render={() => <Overview />}
                  />
                  <Route
                      path="/project/:projectId/setting"
                      render={() => {
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
      </div>);
}

