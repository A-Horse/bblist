import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import R from 'fw-ramda';

import TaskList, {listWidth} from './TaskList';
import {TaskWallSetting} from './TaskWallSetting';
import {DropMenu} from './widget/DropMenu';
import {ConfirmModal} from './widget/ConfirmModal';
import {Hr} from './widget/Hr';
import {PageContainer} from './widget/PageContainer';
import {deleteTaskWall, getTaskAllCards} from '../actions/task-wall';
import {postTaskCard} from '../actions/task-card';
import {createTaskList, deleteTaskList} from '../actions/task-list';
import {getAssets} from '../services/assets-manager';
import {AddIcon, EditIcon, ArrowDownIcon, SettingIcon, MIDDLE_SIZE} from '../services/svg-icons';
import {navHeight} from './Nav';
import {spawnThemeRender} from '../style/theme-render';

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
    display: 'block',
  },
  settingDropMenu: {
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
    display: 'inline-flex',
    verticalAlign: 'top',
    width: `${listWidth}px`,
    margin: '0.3rem 0',
    justifyContent: 'space-between'
  }
};

const themeRender = spawnThemeRender(styles);
themeRender('topBar', 'mainColorBackground');
themeRender('createList', 'grayBackground');

@Radium
class TaskWall extends Component {
  constructor() {
    super();
    this.state = {
      typingNewList: false,
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

  changeListName(listName) {
    const id = R.find((R.propEq('name', listName)))(this.props.wallData.list).id;
  }

  classificationCards(cards, lists) {
    return R.merge(
      lists.reduce((result, list) => {
        result[list.id] = [];
        return result;
      }, {}),
      R.groupBy(_ => _.taskListId)(cards)
    );
  }

  makeListNameMap(lists) {
    return R.zipObj(
      R.pluck('id', lists),
      R.pluck('name', lists),
    );
  }

  getListName(id) {
    return this.listNameMap[id];
  }

  renderList(listId, cards) {
    return (
      <TaskList key={listId}
      listId={listId}
      cards={cards}
      listName={this.getListName(listId)}
      wallId={this.props.params.id}
      />
    )
  }

  renderLists(cardGroups) {
    return Object.keys(cardGroups)
      .map(listName => this.renderList(listName, cardGroups[listName]));
  }

  renderSetttingMenu() {
    return (
      <div style={styles.settingContainer} onClick={() => {}}>
        <SettingIcon style={styles.settingIcon} onClick={() => {this.setState({openSetting: true})}}/>
          <DropMenu toggle={this.state.settingToggle}>
            <ul style={styles.settingDropMenu}>
              <li onClick={() => {this.refs.delConfirm.open()}}>Delete This Wall</li>
              <li>2</li>
            </ul>
          </DropMenu>
          <ConfirmModal confirmFn={() => {this.deleteWall()}} ref='delConfirm'></ConfirmModal>
      </div>
    );
  }

  renderTopBar() {
    const {wallData} = this.props;
    return (
      <div style={styles.topBar}>
        <h2 style={styles.topBarTitle}>{wallData.info.name}</h2>
        <div style={styles.dimensions}>
          {wallData.info.defaultDimensions}
        </div>
        {this.renderSetttingMenu()}
      </div>
    );
  }

  renderCreateList() {
    return (
      <div style={styles.createList} key='createList'>
        {
          this.state.typingNewList ? <input ref='newListInput' onKeyDown={(e) => {if (e.which === 13) this.createNewList()}} onBlur={() => {}}/>
            : <div style={{display: 'flex', alignItems: 'center'}}>
              <AddIcon style={{width: `${MIDDLE_SIZE}px`, height: `${MIDDLE_SIZE}px`}} onClick={() => {this.setState({typingNewList: true})}} />
                  <span>Create List</span>
            </div>   
         }
      </div>
    );
  }

  /* renderSetting() {
   *   return (
   *     <TaskWallSetting {...this.props}/>
   *   );
   * }*/

  render() {
    const {wallData} = this.props;
    const cardGroups = this.classificationCards(wallData.cards, wallData.lists);
    this.listNameMap = this.makeListNameMap(wallData.lists);
    return (
      <div style={styles.container}>
        {this.renderTopBar()}
        <PageContainer style={styles.pageContainer}>
           <div style={styles.listContainer}>
              {this.renderLists(cardGroups)}
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
      .then()
  }
  
  deleteTaskList(listId) {
    const {dispatch} = this.props;
    const wallId = this.props.params.id;
    dispatch(deleteTaskList(wallId, listId)).then(() => {
      
    })
  }
}

const mapStateToProps = (state) => {
  return {
    wallData: state.taskWall.wallData || {info: {}, cards: [], lists: [], list: []},
    status: state.taskCard.status
  };
}

export default connect(mapStateToProps)(TaskWall);
