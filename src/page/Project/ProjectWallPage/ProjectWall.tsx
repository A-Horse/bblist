import './ProjectWall.scss';

import React, { useEffect } from 'react';
import { ProjectWallAside } from './ProjectWallAside/ProjectWallAside';
import { ProjectDisplayCard } from './ProjectCoverItem/ProjectDisplayCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsRequest } from '../../../redux/actions/project.action';
import { RootState } from '../../../redux/reducer';
import { IProject } from '../../../typings/project.typing';

export function ProjectWallPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsRequest());
  }, [dispatch]);

  const projects = useSelector((state: RootState) =>
    Object.values(state.project.projectMap)
  );

  return (
    <div className="ProjectWallPage">
      <ProjectWallAside />

      <div className="ProjectWallPage--content-container">
        <div className="project-cover-container">
          {projects.map((project: IProject) => {
            return <ProjectDisplayCard key={project.id} project={project} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProjectWallPage;
