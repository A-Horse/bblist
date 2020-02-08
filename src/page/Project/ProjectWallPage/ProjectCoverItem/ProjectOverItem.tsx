import React from 'react';
import './ProjectOverItem.scss';
import { Link } from 'react-router-dom';
import { generateProjectCoverUrl } from '../../util/project-cover.util';

export function ProjectOverItem({ project }) {
  return (
    <Link
      className="ProjectOverItem"
      style={{
        backgroundImage: `url(${generateProjectCoverUrl(
          project.get('setting').get('coverFileName')
        )})`
      }}
      key={project.get('id')}
      to={`/project/${project.get('id')}`}
    >
      <div className="ProjectOverItem--info">
        <div className="ProjectOverItem--name">{project.get('name')}</div>
      </div>
    </Link>
  );
}
