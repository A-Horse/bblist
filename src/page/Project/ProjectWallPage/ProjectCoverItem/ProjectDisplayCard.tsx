import React from 'react';
import './ProjectDisplayCard.scss';
import { Link } from 'react-router-dom';
import { objectFileUrl } from '../../../../utils/object-storage';
import { ProjectRecord } from '../../../../typings/project.typing';

export function ProjectDisplayCard({ project }: { project: ProjectRecord }) {
  return (
    <Link
      className="ProjectCoverItem"
      style={{
        backgroundImage: project.get('coverUri')
          ? `url(${objectFileUrl(project.get('coverUri'))})`
          : undefined,
      }}
      key={project.get('id')}
      to={`/project/${project.get('id')}`}
    >
      <div className="ProjectCoverItem--info">
        <div className="ProjectCoverItem--name">{project.get('name')}</div>
      </div>
    </Link>
  );
}
