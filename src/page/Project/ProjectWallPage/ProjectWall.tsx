import './ProjectWall.scss';

import { Layout } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { DEFAULT_BOARD_COVER_SRC } from '../../../constants';
import { ProjectRecord } from '../../../typings/project.typing';
import { generateProjectCoverUrl } from '../util/project-cover.util';
import { BoardWallAside } from './BoardWallAside/BoardWallAside';

const { Content } = Layout;

interface Props {
  actions: any;
  boardMap: any;
  projects: ProjectRecord[];
}

export class ProjectWall extends Component<Props> {
  componentWillMount() {
    return this.props.actions.getProjectsRequest();
  }

  render() {
    return (
      <Content className="board-wall-page-content">
        <div className="board-wall-page-content--inner-container">
          <div className="board-wall-page-content--inner-content">
            <BoardWallAside />

            <div className="taskboard-boards">
              <div className="board-group">
                <div className="board-card-container">
                  {this.props.projects.map((project: ProjectRecord) => {
                    return (
                      <Link
                        className="taskboard-card"
                        style={{
                          backgroundImage: project.get('setting').get('coverUrl') ? `url(${generateProjectCoverUrl(project.get('setting').get('coverUrl'))})` : `url(${DEFAULT_BOARD_COVER_SRC})`
                        }}
                        key={project.get('id')}
                        to={`/project/${project.get('id')}`}
                      >
                        <div className="taskboard-card-info">
                          <div className="taskboard-card-info--name">{project.get('name')}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    );
  }
}
