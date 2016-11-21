import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import R from 'fw-ramda';

import {deleteTaskCard, updateTaskCard, unsetCurrentCard} from 'actions/task/task-card';
import {spawnMixinRender} from 'style/theme-render';
import {CloseIcon, CommentIcon} from 'services/svg-icons';
import UserAvatar from 'components/UserAvatar';
import {Modal} from 'components/widget/Modal';
import {CheckBox} from 'components/widget/CheckBox';
import {Hr} from 'components/widget/Hr';

import 'style/page/task/taskcard-modal.scss';

class CardModal extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {};
  }

  close() {
    const {dispatch} = this.props; 
    dispatch(unsetCurrentCard());
  }

  render() {
    const {card, taskLists} = this.props;
    const currentList = R.find(R.propEq('id', card.taskListId))(taskLists);
    if (!currentList) {
      return null;
    }

    return (
      <Modal className='taskcard-modal' toggle={this.props.toggleTaskCardModal} close={this.close.bind(this)}>
        <div className='taskcard-modal--top-bar'>
          <div>
            <span className='top-bar--list-label'>List:</span>
            <span className='top-bar--list-name'>{currentList.name}</span>
          </div>
          <CloseIcon onClick={this.close.bind(this)}/>
        </div>
        
        <div className='taskcard-modal--title'>
          <CheckBox className='title--checkbox' ref='checkbox' defaultChecked={card.isDone} onChange={this.updateDone.bind(this)}/>
          <input className='title--input' type='text' ref='title' defaultValue={card.title} onChange={this.updateTitle.bind(this)}/>
        </div>

        <div className='hr-container'>
          <Hr/>
        </div>

        <div className='taskcard-modal--content'>
          <textarea ref='content' onChange={this.updateContent.bind(this)} defaultValue={card.content}/>
        </div>

        <div className='taskcard-modal--people'>
          <UserAvatar user={card.creater}/>
        </div>

        <div className='taskcard-modal--operation-container'>
          <div className='taskcard-modal--operation'>
            <CommentIcon className='comment-icon icon'/>
            <CommentIcon className='comment-icon icon'/>
          </div>
        </div>

      </Modal>
    );
  }

  updateTitle() {
    const title = this.refs.title.value.trim();
    this.updateTaskCard({title});
  }

  updateDone() {
    const isDone = this.refs.checkbox.checked;
    this.updateTaskCard({isDone});
  }

  updateContent() {
    const content = this.refs.content.value.trim();
    this.updateTaskCard({content});
  }

  updateTaskCard(data) {
    const {dispatch} = this.props;
    return dispatch(updateTaskCard(this.props.card.id, data));
  }

  deleteTaskCard() {
    const {dispatch} = this.props;
    return dispatch(deleteTaskCard(this.props.card.id));
  }
}

const mapStateToProps = (state) => {
  return {
    card: state.task.card.card,
    toggleTaskCardModal: state.task.card.active,
    taskLists: state.task.list.lists
  };
};

export default connect(mapStateToProps)(CardModal);
