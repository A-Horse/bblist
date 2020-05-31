import './ProjectWall.scss';

import React, { Component } from 'react';
import { ProjectRecord } from '../../../typings/project.typing';
import { BoardWallAside } from './ProjectWallAside/ProjectWallAside';
import { ProjectDisplayCard } from './ProjectCoverItem/ProjectDisplayCard';
import { match } from 'react-router-dom';

interface Props {
  actions: any;
  boardMap: any;
  match: match<any>;
  projects: ProjectRecord[];
}

export class ProjectWallPage extends Component<Props> {
  componentWillMount() {
    return this.props.actions.getProjectsRequest();
  }

  render() {
    return (
      <div className="ProjectWallPage">
        <BoardWallAside match={this.props.match} />

        <div className="ProjectWallPage--content-container">
          <div className="project-cover-container">
            {this.props.projects.map((project: ProjectRecord) => {
              return (
                <ProjectDisplayCard key={project.get('id')} project={project} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
