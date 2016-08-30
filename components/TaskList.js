import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import R from 'fw-ramda';

import {deleteTaskWall, getTaskAllCards} from '../actions/task-wall';
import {postTaskCard} from '../actions/task-card';
import {createTaskList, deleteTaskList} from '../actions/task-list';
import {DropMenu} from './widget/DropMenu';
import {ConfirmModal} from './widget/ConfirmModal';
import {getAssets} from '../services/assets-manager';
import {spawnThemeRender} from '../style/theme-render';
import {PageContainer} from './widget/PageContainer';
import {AddIcon, EditIcon, ArrowDownIcon, SettingIcon} from '../services/svg-icons';
import {TaskWallSetting} from './TaskWallSetting';
import {navHeight} from './Nav';
import {Hr} from './widget/Hr';

const styles = {
  list: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    margin: '0.3rem 1rem 0.3rem',
    width: '250px',
    height: 'calc(100% - 0.6rem)',
    padding: '0 0.4rem',
    zIndex: '1',
    verticalAlign: 'middle'
  },
  listTopBar: {
    position: 'relative',
    height: '3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listNameInput: {
    backgroundColor: 'transparent',
    borderBottom: '1px solid black',
    boxShadow: 'none',
  },
  listName: {
    textAlign: 'center'
  },
  listMenuIcon: {
    verticalAlign: 'middle',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    borderRadius: '50%'
  },
  listSetting: {
    position: 'absolute',
    right: '0.8rem',
    backgroundColor: 'white',
    padding: '4px 0',
    top: '1.5rem',
    transform: 'translate(50%, 0)',
    width: '100px'
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
  },
  card: {
    margin: '0.2rem 0',
    padding: '4px 8px',
    borderRadius: '1px',
    height: '48px'
  }
};

const themeRender = spawnThemeRender(styles);
themeRender('list', 'grayBackground');
themeRender('card', 'lightBackground', 'lightSmallShadow');

@Radium
class TaskList extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      isListEditings: {},
      listSetting: {},
      openCreateCardDom: {}
    };
  }

  toggleEditListName(listName) {
    const obj = {};
    objList[listName] = !this.state.isListEditings[listName];
    this.setState({
      isListEditings: Object.assign(this.state.isListEditings, obj)
    })
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
    return cards.map(cjson => {
      return (
        <div key={cjson.id} style={styles.card}>
          <p>{cjson.title}</p>     
        </div>
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
          
          <ArrowDownIcon className='arrow-down-icon icon' style={styles.listMenuIcon} onClick={() => {const obj = {}; obj[listId] = !this.state.listSetting[listId]; this.setState({listSetting: obj})}}/>

          <DropMenu toggle={this.state.listSetting[listId]}>
          <ul style={styles.listSetting}>
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
    const {dispatch} = this.props,
    title = this.refs.toCreateTitle;
    const data = {
      taskWallId: +this.props.wallId,
      taskListId: listId,
      title: title.value.trim()
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
