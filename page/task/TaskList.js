import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import R from 'fw-ramda';

import TaskCard from './TaskCard';
import TaskCardCreater from './TaskCardCreater';
import {deleteTaskWall, getTaskAllCards} from 'actions/task/task-wall';
import {createTaskList, deleteTaskList} from 'actions/task/task-list';
import {updateTaskCard} from 'actions/task/task-card';
import {DropList} from 'components/widget/DropList';
import {ConfirmModal} from 'components/widget/ConfirmModal';
import {AddIcon, EditIcon, ArrowDownIcon, SettingIcon, MIDDLE_SIZE, SMALL_SIZE} from 'services/svg-icons';
import {spawnMixinRender} from 'style/theme-render';
import GlobalClick from 'services/global-click';

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
    boxShadow: 'none'
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

const themeRender = spawnMixinRender(styles);
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
      listSetting: {},
      editingListName: false
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
    this.setState({listSetting: obj});
    GlobalClick.addGlobalClickHandleOnce(() => {
      const obj = {};
      obj[listId] = false;
      this.setState({
        listSetting: obj
      });
    });
  }

  renderCards(cards) {
    return cards.map(card => {
      return (<TaskCard card={card} key={card.id} />);
    });
  }

  renderListName() {
    const {listId, listName} = this.props;
    if (this.state.editingListName) {
      return (
        <div style={styles.listId}>
          <input type='text' style={styles.listNameInput} ref={`${listId}ChangeName`}
             defaultValue={listName}
             onKeyDown={(e) => {if (e.which === 13) this.changeListName(listId)}}
             onBlur={() => {this.toggleEditListName(listId)}}/>
         </div>
        );
    }
    return (
      <div style={styles.listTitle}>
        {listName} <EditIcon style={styles.listEditIcon} onClick={() => {this.toggleEditListName(listId)}}/>
      </div>
    );
  }

  renderTopBar() {
    const {listId} = this.props;
    return (
      <div style={styles.listTopBar} className="task-list--top-bar">
        {this.renderListName()}
        <ArrowDownIcon className='arrow-down-icon icon' style={styles.listMenuIcon} onClick={() => {this.onClickSetting(listId)}}/>

          <DropList toggle={this.state.listSetting[listId]}>
            <ul style={styles.listSettingDropDown}>
              <li style={styles.listSettingItem} onClick={() => {this.refs.listDeleteConfirm.open()}}>Delete</li>
            </ul>
          </DropList>

          <ConfirmModal confirmFn={() => {this.deleteTaskList(listId)}} ref='listDeleteConfirm' ></ConfirmModal>
      </div>
    )
  }

  render() {
    const {listId, cards} = this.props;
    return (
      <div style={styles.list}
           className="task-list"
           onDragEnter={this.onDragEnter.bind(this)}
           onDrop={this.onDrop.bind(this)}
           onDragLeave={this.onDragLeave.bind(this)}
           onDragOver={this.onDragOver.bind(this)}>

        {this.renderTopBar()}
      
        {this.renderCards(cards)}
        
        <TaskCardCreater wallId={this.props.wallId} listId={listId} />
        
      </div>
    );
  }

  onDragLeave() {
    
  }

  onDragEnter() {
    
  }

  onDrop(event) {    
    const card = event.dataTransfer.getData('card');
  }

  onDragOver(event) {
    console.log(event);
    const {cards} = this.props;
    event.preventDefault();
  }

  requestMoveCardToThisList(card) {
    const thisListId = this.props.listId;
    return updateTaskCard(card.id, {listId: thisListId})
  }

}

const mapStateToProps = (state) => {
  return {
  };
}

export default connect(mapStateToProps)(TaskList);
