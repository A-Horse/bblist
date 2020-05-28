import './ProjectInfoSection.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectRecord } from '../../../../../typings/project.typing';
import { RootState } from '../../../../../redux/reducers';
import { generateProjectCoverUrl } from '../../../util/project-cover.util';

interface InputProps {
  projectID: string;
}

export function ProjectInfoSection({ projectID }: InputProps) {
  const project: ProjectRecord | undefined = useSelector((state: RootState) =>
    state.project.get('projectMap').get(projectID)
  );

  if (!project) {
    return null;
  }

  return (
    <div className="ProjectInfoSection">
      <img
        src={generateProjectCoverUrl(
          project.get('setting').get('coverFileName')
        )}
        alt="cover"
      />

      <div className="ProjectInfoSection--project-name">
        {project.get('name')}
      </div>
    </div>
  );
}
