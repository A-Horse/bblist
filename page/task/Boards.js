import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {PageContainer} from 'components/widget/PageContainer';
import {ThemeConst} from 'style/theme';
import {CloseIcon, AddIcon} from 'services/svg-icons';
import TaskBoardCreater from './TaskBoardCreater';
import {makeRemoteUrl} from 'services/remote-storage';

import 'style/page/task/boards.scss';
import 'style/page/task/taskboard-creater-modal.scss';
import 'style/page/task/taskboard-card.scss';

class Boards extends Component {
  componentWillMount() {
    return this.props.getAllTaskBoard();
  }

  renderWalls() {
    const {normalizedBoard} = this.props;
    return normalizedBoard.result.map(boardId => {
      const board = normalizedBoard.entities[boardId];
      return (
        <div className='taskboard-card'
             style={{backgroundImage: `url(${makeRemoteUrl(board.cover)})`}}
             key={board.id}
             onClick={() => browserHistory.push(`/task-wall/${board.id}`)}>
          <div className='taskboard-card-info'>
            <h2>{board.name}</h2>
          </div>
        </div>
      );
    });
  }
  
  render() {
    return (
      <PageContainer>
        <TaskBoardCreater/>
        <div className='taskboard-board-container'>
          {this.renderWalls()}
        </div>
      </PageContainer>
    );
  }
}

export default Boards;
