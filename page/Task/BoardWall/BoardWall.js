import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { PageContainer } from 'components/widget/PageContainer';

import TaskBoardCreater from '../TaskBoardCreater';
import { makeRemoteUrl } from 'services/remote-storage';
import { DEFAULT_BOARD_COVER_SRC } from '../../../constants';
import Loading from 'components/Loading';
import Nothing from 'components/Nothing';
import { Link } from 'react-router-dom';

import './BoardWall.scss';
import 'style/page/task/taskboard-creater-modal.scss';
import 'style/page/task/taskboard-card.scss';

class BoardWall extends Component {
  componentWillMount() {
    return this.props.actions.getAllTaskBoard();
  }

  renderWalls() {
    return this.props.boards.map(board => {
      return (
        <Link
          className="taskboard-card"
          style={{
            backgroundImage: board.cover
              ? `url(${makeRemoteUrl(board.cover)})`
              : `url(${DEFAULT_BOARD_COVER_SRC})`
          }}
          key={board.id}
          to={`/task-board/${board.id}`}
        >
          <div className="taskboard-card-info">
            <div className="taskboard-card-info--name">
              {board.name}
            </div>
          </div>
        </Link>
      );
    });
  }

  renderContent() {
    if (this.props.isFetching) {
      return <Loading />;
    }
    if (!this.props.boards.length) {
      return <Nothing />;
    }
    return (
      <div className="taskboard-boards">
        <div className="board-group">
          <div className="board-card-container">
            {this.renderWalls()}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <PageContainer>
        <TaskBoardCreater
          getAllTaskBoard={this.props.actions.getAllTaskBoard}
          createTaskBoard={this.props.actions.createTaskBoard}
        />
        {this.renderContent()}
      </PageContainer>
    );
  }
}

export default BoardWall;
