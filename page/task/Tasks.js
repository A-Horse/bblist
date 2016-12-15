import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import {createTaskWall, getAllTaskWall} from 'actions/task/task-wall';
import {Modal} from 'components/widget/Modal';
import {Select} from 'components/widget/Select';
import {PageContainer} from 'components/widget/PageContainer';
import {CateLine} from 'components/widget/CateLine';
import {spawnMixinRender} from 'style/theme-render';
import {ThemeConst} from 'style/theme';
import {CloseIcon, AddIcon} from 'services/svg-icons';
import TaskBoardCreater from './TaskBoardCreater';

import 'style/page/task/boards.scss';
import 'style/page/task/taskboard-creater-modal.scss';
import 'style/page/task/taskboard-card.scss';

class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    };
    this.backgroundValue = null;
  }

  getWalls() {
    const {dispatch} = this.props;
    return dispatch(getAllTaskWall());
  }

  componentWillMount() {
    this.getWalls();
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
             style={{backgroundImage: `url(${board.cover})`}}
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
        <CateLine>current walls:</CateLine>
        <div className='taskboard-board-container'>
          {this.renderWalls()}          
          {this.renderCreateModal()}
        </div>
      </PageContainer>
    );
  }

  handleClick() {
    
  }
}

const mapStateToProps = (state) => {
  return {
    normalizedBoard: state.task.board
  };
};

export default connect(mapStateToProps)(Tasks);
