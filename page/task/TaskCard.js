import React, {Component} from 'react';
import {connect} from 'react-redux';

import {deleteTaskWall, getTaskAllCards} from 'actions/task/task-wall';
import {updateTaskCard, insertVirtualCard, setCurrentCard} from 'actions/task/task-card';
import {createTaskList, deleteTaskList} from 'actions/task/task-list';
import {openTaskCardModal} from 'actions/event/task-wall';
import {DropList} from 'components/widget/DropList';
import {ConfirmModal} from 'components/widget/ConfirmModal';
import {PageContainer} from 'components/widget/PageContainer';
import {Hr} from 'components/widget/Hr';
import {getAssets} from 'services/assets-manager';
import {spawnMixinRender} from 'style/theme-render';
import {AddIcon, EditIcon, ArrowDownIcon, SettingIcon} from 'services/svg-icons';
import {navHeight} from 'components/Nav';
import UserAvatar from 'components/UserAvatar';
import {CheckBox} from 'components/widget/CheckBox';
import BoardCradDragHelper from 'services/board-card-drag-helper';

import 'style/page/task/card.scss';

class TaskCard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
  }

  onDragStart(event) {
    // TODO 移动的图标    
    const crt = this.refs.main.cloneNode(true);

    const width = this.refs.main.offsetWidth;
    const height = this.refs.main.offsetHeight;

    // TODO extract function
    this.crt = crt;
    crt.style.position = 'absolute';
    crt.style.top = '-100%';
    crt.style.right = '-100%';
    crt.style.height = height + 'px';
    crt.style.width = width + 'px';
    document.body.appendChild(crt);
    event.dataTransfer.setDragImage(crt, 0, 0);
    
    BoardCradDragHelper.setData('info', {
      from: {
        listId: this.props.card.taskListId
      },
      offsetX: event.nativeEvent.offsetX,
      offsetY: event.nativeEvent.offsetY,
      width,
      height
    });
  }
  
  onDragEnd(event) {
    document.body.removeChild(this.crt);
  }
  
  openTaskCardModal() {
    const {dispatch} = this.props;
    return dispatch(openTaskCardModal(this.props.card));
  }

  updateDone() {
    const isDone = this.refs.checkbox.checked;
    this.updateTaskCard({isDone});    
  }

  updateTaskCard(data) {
    const {dispatch} = this.props;
    return dispatch(updateTaskCard(this.props.card.id, data));
  }

  onLoad() {
    const height = this.refs.main.offsetHeight;
    this.props.card.height = height;
    this.props.card.loaded = true;
  }

  onClick() {
    const {dispatch} = this.props;
    dispatch(setCurrentCard(this.props.card));
  }

  checkBoxOnClick(event) {
    event.stopPropagation();
  }
  
  render() {
    const {normalizedCard, cardId} = this.props;
    const card = normalizedCard.entities[cardId];
    const activeRole = card.creater;
    return (
      <div className='task-card' ref='main' draggable='true'
           onDragStart={this.onDragStart.bind(this)}
           onDragEnd={this.onDragEnd.bind(this)}
           onClick={this.onClick.bind(this)}
           onLoad={this.onLoad.bind(this)}>
        <CheckBox ref='checkbox' defaultChecked={card.isDone} onChange={this.updateDone.bind(this)} onClick={this.checkBoxOnClick.bind(this)}/>
        <p className='task-card--title'>{card.title}</p>
        <UserAvatar user={activeRole}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    normalizedCard: state.task.card,
    normalizedTrack: state.task.list
  };
};

export default connect(mapStateToProps, null, null, {withRef: true})(TaskCard);
