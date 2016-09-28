import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import R from 'fw-ramda';

import TaskCard from './TaskCard';
import TaskCardCreater from './TaskCardCreater';
import CardPlaceholder from './CardPlaceholder';
import {deleteTaskWall, getTaskAllCards} from 'actions/task/task-wall';
import {createTaskList, deleteTaskList} from 'actions/task/task-list';
import {updateTaskCard, insertVirtualCard} from 'actions/task/task-card';
import {DropList} from 'components/widget/DropList';
import {ConfirmModal} from 'components/widget/ConfirmModal';
import {AddIcon, EditIcon, ArrowDownIcon, SettingIcon, MIDDLE_SIZE, SMALL_SIZE} from 'services/svg-icons';
import {spawnMixinRender} from 'style/theme-render';
import GlobalClick from 'services/global-click';
import {getOffsetHeight} from 'utils/dom';

import 'style/page/task/list.scss';
import styleVariables from '!!sass-variable-loader!style/page/task/list.scss';

// FIXME
export const listWidth = 210;

const styles = {
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
themeRender('listNameInput', 'darkBottomBorder');

let relativeOffsetBody;

@Radium
class TaskList extends Component {
  constructor() {
    super();
    this.index = -1;

    this.dragMeta = {};
  }

  componentWillMount() {
    // TODO rename
    this.state = {
      listSetting: {},
      editingListName: false
    };
  }

  componentDidMount() {
    if (!relativeOffsetBody) {
      relativeOffsetBody = true;
      relativeOffsetBody = getOffsetHeight(this.refs.main, 'body') + +styleVariables.topBarHeight.replace('px', '');
    }
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
      if (card.virtual)  return (<CardPlaceholder height={card.height} width={card.width}/>);
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
      <div className="task-list--top-bar">
        {this.renderListName()}
        <ArrowDownIcon className='arrow-down-icon icon' style={styles.listMenuIcon} onClick={() => {this.onClickSetting(listId)}}/>

          <DropList toggle={this.state.listSetting[listId]}>
            <ul style={styles.listSettingDropDown}>
              <li style={styles.listSettingItem} onClick={() => {this.refs.listDeleteConfirm.open()}}>Delete</li>
            </ul>
          </DropList>

          <ConfirmModal confirmFn={() => {deleteTaskList(listId)}} ref='listDeleteConfirm' ></ConfirmModal>
      </div>
    );
  }

  render() {
    const {listId, cards} = this.props;
    return (
      <div ref='main'
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

  caluMovingPosition(position) {
    const {cards} = this.props;
    const {y} = position;
    
    let xheight = relativeOffsetBody, i = 0;
    
    if (y < xheight) {
      return i;
    }
    
    for(let max = ~this.index ? cards.length - 1: cards.length; i < max; i++) {
      if (cards[i].moving) {
        continue;
      }

      if (i === this.dragMeta.lastCardIndex) {
        xheight += this.dragMeta.lastCardHeight + 6;
        if (y > xheight - cards[i].height / 2) {
          return ++i;
        }
      } else {
        xheight += cards[i].height + 6;
      }
      
      if (y < xheight) {
        if (y > xheight - cards[i].height / 2) {
          ++i;
        }
        this.dragMeta.lastCardHeight = cards[i].height;
        this.dragMeta.lastCardIndex = i;
        return i;
      }
    }
    return i;
  }

  onDragLeave() {
    
  }

  onDragEnter() {
    
  }

  onDrop(event) {
    console.log('onDrog');
    const card = event.dataTransfer.getData('card');
    this.dragMeta = {};
  }

  onDragOver(event) {
    return event.preventDefault();
    console.log('hi');
      const {dispatch} = this.props;
      const offset = {
        x: event.nativeEvent.clientX,
        y: event.nativeEvent.clientY
      };
    const index = this.caluMovingPosition(offset);
    if (index === this.index) {
      return;
    }
    this.index = index;
      dispatch(insertVirtualCard({
        listId: this.props.listId,
        virtualIndex: index
      }));
    
    
    
  }

  requestMoveCardToThisList(card) {
    const thisListId = this.props.listId;
    return updateTaskCard(card.id, {listId: thisListId})
  }

}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(TaskList);
