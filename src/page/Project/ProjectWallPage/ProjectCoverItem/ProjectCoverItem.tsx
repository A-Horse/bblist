import React from 'react';
import './ProjectCoverItem.scss';
import { Link } from 'react-router-dom';
import { generateProjectCoverUrl } from '../../util/project-cover.util';

export function ProjectCoverItem({ project }) {
  return (
    <Link
      className="ProjectCoverItem"
      style={{
        backgroundImage: `url(${generateProjectCoverUrl(
          project.get('setting').get('coverFileName')
        )})`
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
