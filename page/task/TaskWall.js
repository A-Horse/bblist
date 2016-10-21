import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import R from 'fw-ramda';

import TaskList, {listWidth} from './TaskList';
import CardModal from './CardModal';
//import TaskCardModal from 
import {TaskWallSetting} from './TaskWallSetting';
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
import TaskListCreater from './TaskListCreater';

import 'style/page/task/taskboard-header.scss';

const styles = {
  container: {
    position: 'fixed',
    top: `${navHeight}px`,
    left: 0,
    right: 0,
    bottom: 0
  },
  pageContainer: {
    width: '100%',
    overflowX: 'auto',
    height: 'calc(100% - 33px)'
  },
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
      typingNewList: false
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
        <SettingIcon style={styles.settingIcon} onClick={() => {this.setState({openSetting: true})}}/>
          <DropList toggle={this.state.settingToggle}>
            <ul style={styles.settingDropList}>
              <li onClick={() => {this.refs.delConfirm.open()}}>Delete This Wall</li>
              <li>2</li>
            </ul>
          </DropList>
        <ConfirmModal confirmFn={() => {this.deleteWall()}} ref='delConfirm'></ConfirmModal>
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
      <div style={styles.container}>
        {this.renderTopBar()}
        <PageContainer style={styles.pageContainer}>
           <div style={styles.listContainer}>
              {this.renderLists()}
              <TaskListCreater />
           </div>
        </PageContainer>
        <CardModal/>
      </div>
    );
  }

  deleteTaskList(listId) {
    const {dispatch} = this.props;
    const wallId = this.props.params.id;
    dispatch(deleteTaskList(wallId, listId)).then(() => {
      
    });
  }
}

const mapStateToProps = (state) => {
  return {
    wall: state.task.board.wall,
    lists: state.task.list.lists
  };
};

export default connect(mapStateToProps)(TaskWall);
