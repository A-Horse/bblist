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
import {AddIcon, MoreIcon, EditIcon, ArrowDownIcon, SettingIcon, MIDDLE_SIZE, SMALL_SIZE} from 'services/svg-icons';
import {spawnMixinRender} from 'style/theme-render';
import GlobalClick from 'services/global-click';
import Textarea from 'react-textarea-autosize';
import {getOffsetHeight} from 'utils/dom';
import BoardCradDragHelper from 'services/board-card-drag-helper';

import 'style/page/task/task-list.scss';
import styleVariables from '!!sass-variable-loader!style/page/task/task-list.scss';

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

    this.resetDragMeta();
  }

  componentWillMount() {
    // TODO rename
    this.state = {
      listSetting: {}
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
    const {listName} = this.props;
    return (
      <div style={styles.listTitle} className='task-list--title'>
        <Textarea className='title--text' defaultValue={listName}></Textarea>
      </div>
    );
  }

  renderTopBar() {
    const {listId} = this.props;
    return (
      <div className='task-list--top-bar'>
        {this.renderListName()}

        <MoreIcon className='more-icon icon' style={styles.listMenuIcon} onClick={() => this.onClickSetting(listId)}/>
          <DropList toggle={this.state.listSetting[listId]}>
            <ul style={styles.listSettingDropDown}>
              <li style={styles.listSettingItem} onClick={() => this.refs.listDeleteConfirm.open()}>Delete</li>
            </ul>
          </DropList>

          <ConfirmModal confirmFn={() => deleteTaskList(listId)} ref='listDeleteConfirm' ></ConfirmModal>
      </div>
    );
  }

  render() {
    const {listId, cards} = this.props;
    return (
      <div ref='main'
           className='task-list'
           onDragEnter={this.onDragEnter.bind(this)}
           onDrop={this.onDrop.bind(this)}
           onDragLeave={this.onDragLeave.bind(this)}
           onDragOver={this.onDragOver.bind(this)}
           >

        {this.renderTopBar()}
      
        <div className='task-list--body' ref='taskListBody'>
          {this.renderCards(cards)}
        </div>
        <TaskCardCreater wallId={this.props.wallId} listId={listId} />
      </div>
    );
  }

  caluMovingPosition(mousePosition, dragInfo) {
    // 滚动情况
    const {cards} = this.props;
    const {y} = mousePosition;

    // TODO rename
    let xheight = relativeOffsetBody, i = 0;
    
    if (y < xheight) {
      return i;
    }

    let cards2 = cards;
    if (this.cardDragMeta.hasPalceHolderCard) {
      cards2 = R.insert(this.cardDragMeta.placeholderCardIndex, dragInfo, cards2);
    }

    for (let max = cards2.length; i < max; ++i) {
      xheight += cards2[i].height + 6;
      if (y < xheight) {
        return i;
      }
    }
    return --i;
  }

  removePlaceHolderCard() {
    if (this.cardDragMeta.hasPalceHolderCard) {
      this.refs.taskListBody.removeChild(this.cardDragMeta.placeholderCard);
      this.cardDragMeta.hasPalceHolderCard = false;
    }
  }

  addDragingMark() {
    this.refs.main.className += ' has-draging-card';
  }

  removeDragingMark() {
    this.refs.main.className = this.refs.main.className.replace(/\s?has-draging-card/, '');
  }

  resetDragMeta() {
    this.cardDragMeta = {placeholderCardIndex: -1};
  }

  createPlaceHolderCard(dragingCardInfo) {
    const phcard = document.createElement('div');
    phcard.className = 'task-card task-card-placeholder';
    phcard.style.height = dragingCardInfo.height + 'px';
    phcard.style.width = dragingCardInfo.width + 'px';
    return phcard;
  }

  onDragLeave() {
    this.removeDragingMark();
    this.removePlaceHolderCard();
  }
  
  onDragEnter() {
    this.addDragingMark();
  }

  onDrop() {
    this.removePlaceHolderCard();
    this.removeDragingMark();
    this.resetDragMeta();
  }

  onDragOver(event) {
    event.preventDefault();
    const mousePosition = {x: event.nativeEvent.clientX, y: event.nativeEvent.clientY};
    const dragingCardInfo = BoardCradDragHelper.getData('info');

    const placeHolderCardIndex = this.caluMovingPosition(mousePosition, dragingCardInfo);
    if (placeHolderCardIndex === this.cardDragMeta.placeholderCardIndex) {
      return;
    }
    this.cardDragMeta.placeholderCardIndex = placeHolderCardIndex;
    this.removePlaceHolderCard();

    const div = this.createPlaceHolderCard(dragingCardInfo);
    this.cardDragMeta.placeholderCard = div;
    this.cardDragMeta.hasPalceHolderCard = true;

    if (placeHolderCardIndex === this.props.cards.length) {
      this.refs.taskListBody.appendChild(div);
    } else {
      this.refs.taskListBody.insertBefore(div, this.refs.taskListBody.querySelectorAll('.task-card')[placeHolderCardIndex]);1
    }    
  }

  requestMoveCardToThisList(card) {
    const thisListId = this.props.listId;
    return updateTaskCard(card.id, {listId: thisListId});
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(TaskList);
