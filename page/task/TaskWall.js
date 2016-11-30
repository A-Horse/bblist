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
import {createTaskList, deleteTaskList} from 'actions/task/task-list';
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

class TaskWall extends Component {
  constructor() {
    super();
    this.state = {
      typingNewList: false,
      boardSettingToggle: false
    };
  }
  
  componentWillMount() {
    const {id} = this.props.params;
    const {dispatch} = this.props;
    
    dispatch(clearBoard());
    this.getTasks(id).then(() => {
      
    }).catch(error => {
      // TODO 404
    });
  }

  componentDidMount() {
    console.log(this.props);
  }
  
  getTasks(id) {
    const {dispatch} = this.props;    
    return dispatch(getTaskAllCards(id));
  }
  
  renderList(list) {
    return <TaskList key={list.id} listId={list.id} cards={list.cards} listName={list.name} wallId={this.props.params.id}/>;
  }

  renderLists() {
    const {lists} = this.props;
    return lists.map(list => this.renderList(list));
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
      <div className='board-container'>
        {this.renderTopBar()}
        <PageContainer className='board-page-container'>
          <div style={styles.listContainer}>
            {this.renderLists()}
            <TaskListCreater boardId={this.props.params.id}/>
          </div>
        </PageContainer>
        <CardModal key='card-modal'/>
        <BoardSetting toggle={this.state.boardSettingToggle} boardId={this.props.params.id} key='board-setting'/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wall: state.task.board.wall,
    lists: state.task.list.lists
  };
};

export default connect(mapStateToProps)(TaskWall);
