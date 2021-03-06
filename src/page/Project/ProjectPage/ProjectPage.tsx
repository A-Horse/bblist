import './ProjectPage.scss';

import { History, Location } from 'history';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  match,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import { getProjectDetailRequest } from '../../../redux/actions/project.action';
import { ProjectEpics } from './ProjectEpics/ProjectEpics';
import { KanbanTab } from './KanbanTab/KanbanTab';
import { ProjectSetting } from './ProjectSetting/ProjectSetting';
import { ProjectSideBar } from './ProjectSideBar/ProjectSideBar';
import { Overview } from './ProjectOverview/Overview';
import { IProject } from '../../../typings/project.typing';
import { ProjectIssueList } from './ProjectIssueList/ProjectIssueList';
import { ProjectTeam } from './ProjectTeam/ProjectTeam';
import { getProjectKanbansRequest } from '../../../redux/actions/kanban.action';
import { parseQueryParams } from '../../../utils/url.util';
import { IssueDetailModal } from '../../../components/Project/Issue/IssueDetail/IssueDetailModal';

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
    dispatch(getProjectDetailRequest(projectId));
    dispatch(getProjectKanbansRequest({ projectId }));
  }, [dispatch, projectId]);

  return (
    <div className="ProjectPage">
      <div className="ProjectPage--main">
        <ProjectSideBar projectId={projectId} />

        {
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
                render={() => <KanbanTab />}
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

            <Route
              path={[
                '/project/:projectId/kanban/:kanbanId',
                '/project/:projectId/*',
              ]}
              render={(props: RouteComponentProps<any>) => {
                const query = parseQueryParams(props.location.search);
                if (!query.selectIssue) {
                  return null;
                }
                return (
                  <IssueDetailModal
                    projectId={props.match.params.projectId}
                    issueId={query.selectIssue}
                  />
                );
              }}
            />
          </div>
        }
      </div>
    </div>
  );
}
