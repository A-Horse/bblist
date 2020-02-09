import './ProjectWall.scss';

import React, { Component } from 'react';
import { ProjectRecord } from '../../../typings/project.typing';
import { BoardWallAside } from './ProjectWallAside/ProjectWallAside';
import { ProjectCoverItem } from './ProjectCoverItem/ProjectCoverItem';
import { match } from 'react-router';

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
                <ProjectCoverItem key={project.get('id')} project={project} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
