import './ProjectInfoSection.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducer';
import { ObjectImage } from '../../../../../components/ObjectImage';
import { IProject } from '../../../../../typings/project.typing';

interface InputProps {
  projectID: string;
}

export function ProjectInfoSection({ projectID }: InputProps) {
  const project: IProject | undefined = useSelector(
    (state: RootState) => state.project.projectMap[projectID]
  );

  if (!project) {
    return null;
  }

  return (
    <div className="ProjectInfoSection">
      <ObjectImage uri={project.coverUri} alt="project-cover" />

      <div className="ProjectInfoSection--project-name">{project.name}</div>
    </div>
  );
}
