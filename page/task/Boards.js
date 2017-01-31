import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {PageContainer} from 'components/widget/PageContainer';
import {ThemeConst} from 'style/theme';
import {CloseIcon, AddIcon} from 'services/svg-icons';
import TaskBoardCreater from './TaskBoardCreater';
import {makeRemoteUrl} from 'services/remote-storage';
import {DEFAULT_BOARD_COVER_SRC} from 'constants';
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
             style={{backgroundImage: board.cover ? `url(${makeRemoteUrl(board.cover)})` : `url(${DEFAULT_BOARD_COVER_SRC})`}}
             key={board.id}
             onClick={() => browserHistory.push(`/task-wall/${board.id}`)}>
          <div className='taskboard-card-info'>
            <div className='taskboard-card-info--name'>{board.name}</div>
          </div>
        </div>
      );
    });
  }
  
  render() {
    return (
      <PageContainer>
        <TaskBoardCreater getAllTaskBoard={this.props.getAllTaskBoard} createTaskBoard={this.props.createTaskBoard}/>
        <div className='taskboard-boards'>
          <div className='board-group'>
            <div className='board-group--name'>Default:</div>
            <div className='board-card-container'>
              {this.renderWalls()}
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}

export default Boards;
