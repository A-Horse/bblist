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
import {updateTitle} from 'services/title';

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
  topBarTitle: {
    color: 'white'
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
    updateTitle('Task Board');
  }

  
  getTasks(id) {
    const {dispatch} = this.props;    
    return dispatch(getTaskAllCards(id));
  }
  
  renderSetttingMenu() {
    return (
      <div style={styles.settingContainer} onClick={() => {}}>
        <SettingIcon style={styles.settingIcon} onClick={() => browserHistory.push(`/task-wall/${this.props.params.id}/setting`)}/>
      </div>
    );
  }

  renderTopBar() {
    const {id} = this.props.params;
    const {normalizedBoard} = this.props;
    const board = normalizedBoard.entities[id];
    return (
      <div className='taskboard-header'>
        <h2 className='' style={styles.topBarTitle}>{board && board.name}</h2>
        {this.renderSetttingMenu()}
      </div>
    );
  }

  render() {
    return (
      <div className='board-container'>
        {this.renderTopBar()}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    normalizedBoard: state.task.board
  };
};

export default connect(mapStateToProps)(TaskWall);
