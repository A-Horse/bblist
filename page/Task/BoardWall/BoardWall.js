import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PageContainer } from 'components/widget/PageContainer';
import TaskBoardCreater from '../TaskBoardCreater/TaskBoardCreater';
import { makeRemoteUrl } from 'services/remote-storage';
import { DEFAULT_BOARD_COVER_SRC } from '../../../constants';

import './BoardWall.scss';
import 'style/page/task/taskboard-creater-modal.scss';

class BoardWall extends Component {
  static propTypes = {
    actions: PropTypes.object,
    boardMap: PropTypes.object
  };

  componentWillMount() {
    return this.props.actions.GET_TASK_ALL_BOARD_REQUEST();
  }

  render() {
    return (
      <PageContainer>
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
      </PageContainer>
    );
  }
}

export default BoardWall;
