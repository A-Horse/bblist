// TODO rename this file

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {Modal} from 'components/widget/Modal';
import {Select} from 'components/widget/Select';
import {PageContainer} from 'components/widget/PageContainer';
import {CateLine} from 'components/widget/CateLine';
import {spawnMixinRender} from 'style/theme-render';
import {ThemeConst} from 'style/theme';
import {CloseIcon, AddIcon} from 'services/svg-icons';
import TaskBoardCreater from './TaskBoardCreater';
import {makeRemoteUrl} from 'services/remote-storage';

import 'style/page/task/boards.scss';
import 'style/page/task/taskboard-creater-modal.scss';
import 'style/page/task/taskboard-card.scss';

class Boards extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    };
  }

  componentWillMount() {
    return this.props.getAllTaskBoard();
  }

  renderCreateModal() {
    return <TaskBoardCreater toggle={this.state.modalOpen}/>;
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
        <div className='taskboard-board-container'>
          {this.renderWalls()}          
          {this.renderCreateModal()}
        </div>
      </PageContainer>
    );
  }
}

export default Boards;
