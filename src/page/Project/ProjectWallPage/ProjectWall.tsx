import './ProjectWall.scss';

import React, { useEffect } from 'react';
import { ProjectWallAside } from './ProjectWallAside/ProjectWallAside';
import { ProjectDisplayCard } from './ProjectCoverItem/ProjectDisplayCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsRequest } from '../../../redux/actions/project.action';
import { RootState } from '../../../redux/reducer';
import { IProject } from '../../../typings/project.typing';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { AllKanban } from './AllKanban/AllKanban';
import { parseQueryParams } from '../../../utils/url.util';
import { IssueDetailModal } from '../../../components/Project/Issue/IssueDetail/IssueDetailModal';
import { selectAllProject } from '../../../redux/reducer/selector/project.selector';

export function ProjectWallPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsRequest());
  }, [dispatch]);

  const projects = useSelector((state: RootState) => selectAllProject(state));

  return (
    <div className="ProjectWallPage">
      <ProjectWallAside />

      <div className="ProjectWallPage--content-container">
        <Switch>
          <Route
            path="/projects/overview"
            render={() => (
              <div className="project-cover-container">
                {projects.map((project: IProject) => {
                  return (
                    <ProjectDisplayCard key={project.id} project={project} />
                  );
                })}
              </div>
            )}
          />

          <Route
            path="/projects/all"
            render={() => (
              <div className="project-cover-container">
                {projects.map((project: IProject) => {
                  return (
                    <ProjectDisplayCard key={project.id} project={project} />
                  );
                })}
              </div>
            )}
          />

          <Route path="/projects/kanbans" render={() => <AllKanban />} />

          <Route path="*" render={() => <Redirect to="/projects/overview" />} />
        </Switch>

        <Route
          path={['/projects/*']}
          render={(props: RouteComponentProps<any>) => {
            const query = parseQueryParams(props.location.search);
            if (!query.selectIssue) {
              return null;
            }
            const projectId = query.selectIssue.split('-')[0];
            return (
              <IssueDetailModal
                projectId={projectId}
                issueId={query.selectIssue}
              />
            );
          }}
        />
      </div>
    </div>
  );
}

export default ProjectWallPage;
