import './ProjectInfoSection.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectRecord } from '../../../../../typings/project.typing';
import { RootState } from '../../../../../redux/reducer';
import { ObjectImage } from '../../../../../components/ObjectImage';

interface InputProps {
  projectID: string;
}

export function ProjectInfoSection({ projectID }: InputProps) {
  const project: ProjectRecord | undefined = useSelector((state: RootState) =>
    state.project.projectMap.get(projectID)
  );

  if (!project) {
    return null;
  }

  return (
    <div className="ProjectInfoSection">
      <ObjectImage uri={project.get('coverUri')} alt="project-cover" />

      <div className="ProjectInfoSection--project-name">
        {project.get('name')}
      </div>
    </div>
  );
}
