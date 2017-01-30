import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import R from 'fw-ramda';

import TaskList, {listWidth} from './TaskList';
import CardModal from './CardModal';
//import TaskCardModal from 
import {DropList} from 'components/widget/DropList';
import {ConfirmModal} from 'components/widget/ConfirmModal';
import {Hr} from 'components/widget/Hr';
import {PageContainer} from 'components/widget/PageContainer';
import {deleteTaskWall, getTaskAllCards} from 'actions/task/task-wall';
import {createTaskCard} from 'actions/task/task-card';
import {createTaskList, deleteTaskList, updateTaskTrackIndex} from 'actions/task/task-list';
import {clearBoard} from 'actions/task/task';
import {getAssets} from 'services/assets-manager';
import {AddIcon, SettingIcon, MIDDLE_SIZE} from 'services/svg-icons';
import {navHeight} from 'components/Nav';
import {spawnMixinRender} from 'style/theme-render';
import {BoardSetting} from './BoardSetting.js';
import TaskListCreater from './TaskListCreater';

import 'style/page/task/taskboard-header.scss';
import 'style/page/task/board.scss';

const styles = {
  settingIcon: {
    fill: 'white',
    verticalAlign: 'middle'
  },
  settingContainer: {
    display: 'block'
  },
  settingDropList: {
    display: 'block',
    position: 'absolute',
    top: '30px',
    left: '0',
    padding: '0',
    listStyle: 'none'
  },
  topBarTitle: {
    color: 'white'
  },
  dimensions: {
    
  },
  listContainer: {
    position: 'relative',
    justifyContent: 'center',
    height: '100%',
    whiteSpace: 'nowrap'
  }
};

class BoardContent extends Component {
  constructor() {
    super();
    this.state = {
      typingNewList: false,
      boardSettingToggle: false
    };

    this.trackInstanceMap = {};
  }

  componentDidMount() {
    
  }

  getTasks(id) {
    const {dispatch} = this.props;    
    return dispatch(getTaskAllCards(id));
  }

  updateTaskTrackIndexs() {
    const {dispatch} = this.props;
    const trackIndexs = Object.values(this.trackInstanceMap).map(track => track.getWrappedInstance().getTrackIdIndex());
    dispatch(updateTaskTrackIndex(this.props.params.id, trackIndexs));
  }

  renderList(list, index) {
    return <TaskList
         key={list.id}
         ref={(track) => {this.trackInstanceMap[list.id] = track;}}
         dataIndex={index}
         listId={list.id}
         cardIds={list.cards}
         listName={list.name}
         updateTaskTrackIndexs={this.updateTaskTrackIndexs.bind(this)}
         wallId={this.props.params.id}>
      </TaskList>;
  }

  renderLists() {
    const {normalizedList} = this.props;
    return R.compose(R.sortBy(R.prop('index')),
                R.values)
    (normalizedList.entities).map(this.renderList.bind(this));
  }

  renderSetttingMenu() {
    return (
      <div style={styles.settingContainer} onClick={() => {}}>
        <SettingIcon style={styles.settingIcon} onClick={() => this.setState({boardSettingToggle: true})}/>
      </div>
    );
  }

  renderTopBar() {
    const {wall} = this.props;
    return (
      <div className='taskboard-header'>
        <h2 style={styles.topBarTitle}>{wall.name}</h2>
        {this.renderSetttingMenu()}
      </div>
    );
  }
  
  render() {
    return (
      <PageContainer className='board-page-container'>
        <div className='board-track-container' style={styles.listContainer}>
          {this.renderLists()}
          <TaskListCreater boardId={this.props.params.id}/>
        </div>
        <CardModal key='card-modal'/>
        </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wall: state.task.board.wall,
    normalizedList: state.task.list
  };
};

export default connect(mapStateToProps)(BoardContent);
