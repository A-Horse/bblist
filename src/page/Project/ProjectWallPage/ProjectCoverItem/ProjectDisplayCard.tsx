import React from 'react';
import './ProjectDisplayCard.scss';
import { Link } from 'react-router-dom';
import { objectFileUrl } from '../../../../utils/object-storage';
import { IProject } from '../../../../typings/project.typing';

export function ProjectDisplayCard({ project }: { project: IProject }) {
  return (
    <Link
      className="ProjectCoverItem"
      style={{
        backgroundImage: project.coverUri
          ? `url(${objectFileUrl(project.coverUri)})`
          : undefined,
      }}
      key={project.id}
      to={`/project/${project.id}`}
    >
      <div className="ProjectCoverItem--info">
        <div className="ProjectCoverItem--name">{project.name}</div>
      </div>
    </Link>
  );
}
