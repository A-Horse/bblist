// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TaskBoardCreater } from '../TaskBoardCreater/TaskBoardCreater';
import { makeRemoteUrl } from '../../../services/remote-storage';
import { DEFAULT_BOARD_COVER_SRC } from '../../../constants';
import { Layout } from 'antd';
const { Content } = Layout;

import './BoardWall.scss';

export class BoardWall extends Component<{
  actions: any,
  boardMap: any
}> {
  componentWillMount() {
    return this.props.actions.GET_TASK_ALL_BOARD_REQUEST();
  }

  render() {
    return (
      <Content style={{ padding: '0 20px', width: '850px', margin: '0 auto' }}>
        <TaskBoardCreater actions={this.props.actions} />
        <div className="taskboard-boards">
          <div className="board-group">
            <div className="board-card-container">
              {this.props.boardMap &&
                this.props.boardMap.toArray().map(board => {
                  return (
                    <Link
                      className="taskboard-card"
                      style={{
                        backgroundImage: board.get('cover')
                          ? `url(${makeRemoteUrl(board.get('cover'))})`
                          : `url(${DEFAULT_BOARD_COVER_SRC})`
                      }}
                      key={board.get('id')}
                      to={`/task-board/${board.get('id')}`}
                    >
                      <div className="taskboard-card-info">
                        <div className="taskboard-card-info--name">{board.get('name')}</div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </Content>
    );
  }
}
