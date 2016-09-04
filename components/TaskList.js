import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import R from 'fw-ramda';

import TaskCard from './TaskCard';
import {deleteTaskWall, getTaskAllCards} from '../actions/task-wall';
import {postTaskCard} from '../actions/task-card';
import {createTaskList, deleteTaskList} from '../actions/task-list';
import {DropMenu} from './widget/DropMenu';
import {ConfirmModal} from './widget/ConfirmModal';
import {PageContainer} from './widget/PageContainer';
import {Hr} from './widget/Hr';
import {getAssets} from '../services/assets-manager';
import {AddIcon, EditIcon, ArrowDownIcon, SettingIcon, MIDDLE_SIZE, SMALL_SIZE} from '../services/svg-icons';
import {spawnThemeRender} from '../style/theme-render';
import GlobalClick from '../services/global-click';

export const listWidth = 210;

const styles = {
  list: {
    borderRadius: '1px',
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    margin: '0.3rem 1rem 0.3rem',
    width: `${listWidth}px`,
    height: 'calc(100% - 0.6rem)',
    padding: '0 0.4rem',
    zIndex: '1',
    verticalAlign: 'middle'
  },
  listTopBar: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.3rem 0 0.2rem'
  },
  listNameInput: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  listName: {
    textAlign: 'center'
  },
  listMenuIcon: {
    verticalAlign: 'middle',
    width: `${SMALL_SIZE}px`,
    height: `${SMALL_SIZE}px`,
    cursor: 'pointer',
    borderRadius: '50%',
    border: '1px solid #999',
    backgroundColor: 'white'
  },
  listSettingDropDown: {
    position: 'absolute',
    right: '0.8rem',
    backgroundColor: 'white',
    padding: '4px 0',
    top: '.5rem',
    transform: 'translate(50%, 0)',
    width: '100px',
    border: '1px solid #999'
  },
  listEditIcon: {
    marginTop: '-0.2rem',
    width: '1.2rem',
    verticalAlign: 'middle'    
  },
  listSettingItem: {
    padding: '0 10px',
    ':hover': {
      backgroundColor: '#eee'
    }
  },
  listTitle: {
    fontWeight: 'bold'
  }
};

const themeRender = spawnThemeRender(styles);
themeRender('list', 'grayBackground');
themeRender('card', 'lightBackground', 'lightSmallShadow');
themeRender('listNameInput', 'darkBottomBorder');

@Radium
class TaskList extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    // TODO rename
    this.state = {
      isListEditings: {},
      listSetting: {},
      openCreateCardDom: {}
    };
  }

  toggleEditListName(listName) {
    const obj = {};
    obj[listName] = !this.state.isListEditings[listName];
    this.setState({
      isListEditings: Object.assign(this.state.isListEditings, obj)
    });
  }

  onClickSetting(listId) {
    const obj = {};
    obj[listId] = !this.state.listSetting[listId];
    // TODO rename
    this.setState({listSetting: obj})
    GlobalClick.addGlobalClickHandleOnce(() => {
      const obj = {};
      obj[listId] = false;
      this.setState({
        listSetting: obj
      });
    });
  }

  renderCreateCardDom(listName) {
    return (
        <div>
        <div>
          <span>title</span>
          <input type='text' ref='toCreateTitle' />
        </div>
        <button onClick={() => this.createCard(listName)} >Post</button>
      </div>
    );
  }

  renderCards(cards) {
    return cards.map(card => {
      return (
        <TaskCard card={card} key={card.id} />
      );
    });
  }

  render() {
    const {listId, listName, cards} = this.props;
    return (
      <div style={styles.list}>
        <div style={styles.listTopBar}>
          {this.state.isListEditings[listId]
         ? (<div style={styles.listId}><input type='text' style={styles.listNameInput} ref={`${listId}ChangeName`} defaultValue={listName} onKeyDown={(e) => {if (e.which === 13) this.changeListName(listId)}} onBlur={() => {this.toggleEditListName(listId)}}/></div>)
         : (<div style={styles.listTitle}>{listName} <EditIcon style={styles.listEditIcon} onClick={() => {this.toggleEditListName(listId)}}/></div>)}
          
          <ArrowDownIcon className='arrow-down-icon icon' style={styles.listMenuIcon} onClick={() => {this.onClickSetting(listId)}}/>

          <DropMenu toggle={this.state.listSetting[listId]}>
          <ul style={styles.listSettingDropDown}>
          <p style={{textAlign: 'center'}}>Setting</p>
          <Hr style={{magin: '0.3rem 0'}}/>
          <li key={listId + 'SettingDelete'} style={styles.listSettingItem} onClick={() => {this.refs[`delListConfirm${listId}`].open()}}>Delete</li>
          </ul>
          </DropMenu>
        </div>
        
        <ConfirmModal confirmFn={() => {this.deleteTaskList(listId)}} ref={`delListConfirm${listId}`}></ConfirmModal>
        
      
        {this.renderCards(cards)}
        {this.state.openCreateCardDom[listId] ? this.renderCreateCardDom(listId) : 
         <div onClick={() => {const obj = {}; obj[listId] = !this.state.openCreateCardDom[listId]; this.setState({openCreateCardDom: Object.assign({}, this.state.openCreateCardDom, obj)})}}>+ New Task</div>}
      </div>
    );
  }

  createCard(listId) {
    const {dispatch} = this.props;
    const data = {
      taskWallId: +this.props.wallId,
      taskListId: listId,
      title: this.refs.toCreateTitle.value.trim()
    };
    dispatch(postTaskCard(data)).then(() => {
      return dispatch(getTaskAllCards(this.props.wallId));
    });
  }
}

const mapStateToProps = (state) => {
  return {
    wallData: state.taskWall.wallData
  };
}

export default connect(mapStateToProps)(TaskList);
