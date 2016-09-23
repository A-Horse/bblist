import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import R from 'fw-ramda';

import TaskList, {listWidth} from './TaskList';
import {TaskWallSetting} from './TaskWallSetting';
import {DropList} from 'components/widget/DropList';
import {ConfirmModal} from 'components/widget/ConfirmModal';
import {Hr} from 'components/widget/Hr';
import {PageContainer} from 'components/widget/PageContainer';
import {deleteTaskWall, getTaskAllCards} from 'actions/task/task-wall';
import {createTaskCard} from 'actions/task/task-card';
import {createTaskList, deleteTaskList} from 'actions/task/task-list';
import {getAssets} from 'services/assets-manager';
import {AddIcon, SettingIcon, MIDDLE_SIZE} from 'services/svg-icons';
import {navHeight} from 'components/Nav';
import {spawnMixinRender} from 'style/theme-render';

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
  topBar: {
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    height: '33px',
    padding: '0 2px 0 16px',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  },
  createList: {
    borderRadius: '1px',
    padding: '0.3rem 0.4rem',
    display: 'inline-flex',
    verticalAlign: 'top',
    width: `${listWidth}px`,
    margin: '0.3rem 0',
    justifyContent: 'space-between'
  }
};

const themeRender = spawnMixinRender(styles);
themeRender('topBar', 'mainColorBackground');
themeRender('createList', 'grayBackground');

@Radium
class TaskWall extends Component {
  constructor() {
    super();
    this.state = {
      typingNewList: false
    };
  }
  
  componentWillMount() {
    const {id} = this.props.params;
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
      <div style={styles.topBar}>
        <h2 style={styles.topBarTitle}>{wall.name}</h2>
        <div style={styles.dimensions}>
          {wall.defaultDimensions}
        </div>
        {this.renderSetttingMenu()}
      </div>
    );
  }

  renderCreateList() {
    return (
      <div style={styles.createList} key='createList'>
        {this.renderCreateListTitle()}
      </div>
    );
  }

  renderCreateListTitle() {
    if (this.state.typingNewList) {
      return <input ref='newListInput' onKeyDown={(e) => {if (e.which === 13) this.createNewList()}} onBlur={() => {}}/>;
    }
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <AddIcon style={{width: `${MIDDLE_SIZE}px`, height: `${MIDDLE_SIZE}px`}} onClick={() => {this.setState({typingNewList: true})}} />
          <span>Create List</span>
      </div>
    );
  }

  /* renderSetting() {
   *   return (
   *     <TaskWallSetting {...this.props}/>
   *   );
   * }*/

  render() {
    return (
      <div style={styles.container}>
        {this.renderTopBar()}
        <PageContainer style={styles.pageContainer}>
           <div style={styles.listContainer}>
              {this.renderLists()}
              {this.renderCreateList()}
           </div>
        </PageContainer>
      </div>
    );
  }

  createNewList() {
    const {dispatch} = this.props;
    const name = this.refs.newListInput;
    dispatch(createTaskList(this.props.params.id, {name: name.value.trim()}))
      .then();
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
    wall: state.taskWall.wall,
    lists: state.taskList.lists
  };
}

export default connect(mapStateToProps)(TaskWall);
