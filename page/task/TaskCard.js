import React, {Component} from 'react';
import {connect} from 'react-redux';

import {deleteTaskWall, getTaskAllCards} from 'actions/task/task-wall';
import {updateTaskCard, insertVirtualCard, activeCardModal} from 'actions/task/task-card';
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
import {getMouseElementInnerOffset} from 'utils/dom';

import 'style/page/task/card.scss';

class TaskCard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
  }

  // onDragStart(event) {
  //   // TODO 移动的图标
  //   const {normalizedCard, cardId} = this.props;
  //   const card = normalizedCard.entities[cardId];
    
  //   const crt = this.refs.main.cloneNode(true);

  //   const width = this.refs.main.offsetWidth;
  //   const height = this.refs.main.offsetHeight;

  //   // TODO extract function
  //   this.crt = crt;

  //   crt.style.position = 'absolute';
  //   crt.style.top = '-100%';
  //   crt.style.right = '-100%';
  //   crt.style.height = height + 'px';
  //   crt.style.width = width + 'px';
  //   document.body.appendChild(crt);
  //   event.dataTransfer.setDragImage(crt, 0, 0);
    
  //   BoardCradDragHelper.setData('info', {
  //     from: {
  //       listId: card.taskListId
  //     },
  //     offsetX: event.nativeEvent.offsetX,
  //     offsetY: event.nativeEvent.offsetY,
  //     width,
  //     height
  //   });
    
  //   this.refs.main.style.position = 'absolute';
  //   this.isDragging = true;
  // }
  
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
    this.height = this.refs.main.offsetHeight;
    this.width = this.refs.main.offsetWidth;
  }

  onClick(event) {
    const {dispatch} = this.props;
    return dispatch(activeCardModal(this.props.cardId));
  }

  checkBoxOnClick(event) {
    event.stopPropagation();
  }

  onMouseDown(event) {
    // TODO  尝试一下 react 的方法
    this.mouseMoving = false;

    event.preventDefault();
    event.stopPropagation();
    const tracks = window.document.querySelectorAll('.task-list');

    const thisCard = this.refs.main;
    
    const movingCard = thisCard.cloneNode(true);
    const pageContainer = window.document.body.querySelector('.board-page-container');

    const mouseOffsetInCard = getMouseElementInnerOffset(thisCard, event);

    const self = this;
    function onMouseMove(event) {
      if (!self.mouseMoving) {
        movingCard.style.height = thisCard.offsetHeight;
        movingCard.style.width = thisCard.offsetWidth;
        movingCard.style.position = 'absolute';
        movingCard.style.left = event.pageX + 'px';
        movingCard.style.top = event.pageY + 'px';
        
        window.document.body.appendChild(movingCard);
      }
      self.mouseMoving = true;
      const movingOffsetY = event.pageY;
      const movingOffsetX = event.pageX + pageContainer.scrollLeft;
      movingCard.style.left = '0';
      movingCard.style.top = '0';
      movingCard.style.transform = `translate(${movingOffsetX - mouseOffsetInCard.left}px, ${movingOffsetY - mouseOffsetInCard.top}px)`;
    }
    
    function onMouseUp(event) {
      window.document.body.removeChild(movingCard);
      window.document.body.removeEventListener('mousemove', onMouseMove);
      window.document.body.removeEventListener('mouseup', onMouseUp);
    }

    window.document.body.addEventListener('mousemove', onMouseMove);
    window.document.body.addEventListener('mouseup', onMouseUp);
  }

  render() {
    const {normalizedCard, cardId} = this.props;
    const card = normalizedCard.entities[cardId];
    const activeRole = card.creater;
    return (
      <div className='task-card' ref='main'
           onMouseDown={this.onMouseDown.bind(this)}
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
