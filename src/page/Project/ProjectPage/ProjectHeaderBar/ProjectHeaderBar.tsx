import './ProjectHeaderBar.scss';

import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../reducers';
import { ProjectRecord } from '../../../../typings/project.typing';
import { ProjectAddButton } from './ProjectAddButton';

interface InputProps {
  projectId: string;
}

export function ProjectHeaderBar({ projectId }: InputProps) {
  const project: ProjectRecord | undefined = useSelector((state: RootState) => state.project.get('projectMap').get(projectId));

  if (!project) {
    return null;
  }

  return (
    <div className="ProjectHeaderBar">
      <div className="ProjectHeaderBar--project-name">{project.get('name')}</div>

      <div>
        <ProjectAddButton />
      </div>
    </div>
  );
}
