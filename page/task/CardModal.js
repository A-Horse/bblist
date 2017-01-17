import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import R from 'fw-ramda';

import {deleteTaskCard, updateTaskCard, unactiveCardModal, getCardDetail} from 'actions/task/task-card';
import {getTaskAllCards} from 'actions/task/task-wall';
import {createTaskCardComment} from 'actions/task/task-card-comment';
import {spawnMixinRender} from 'style/theme-render';
import {CloseIcon, CommentIcon} from 'services/svg-icons';
import UserAvatar from 'components/UserAvatar';
import {Modal} from 'components/widget/Modal';
import {CheckBox} from 'components/widget/CheckBox';
import {Pomodoro} from 'components/Pomodoro';
import Textarea from 'react-textarea-autosize';
import {Hr} from 'components/widget/Hr';
import {Select} from 'components/widget/Select';
import {Button} from 'components/widget/Button';
import {isEnterKey} from 'utils/keyboard';

import 'style/page/task/taskcard-modal.scss';

class CardModal extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {};
  }

  componentDidMount() {
    
  }

  close() {
    const {dispatch} = this.props; 
    return dispatch(unactiveCardModal());
  }

  onChangeTrack(track) {
    this.updateTaskCard({taskListId: track.value});
  }
  
  getCardDetail() {
    const {dispatch, card} = this.props;
    return dispatch(getCardDetail(card.id));
  }

  buildListSelectItems() {
    return R.compose(
      R.map(list => ({name: list.name, value: list.id})),
      R.sortBy(R.prop('index')),
      R.values)
    (this.props.normalizedList.entities);
  }

  buildListSelectDefaultItem(currentList) {
    return {name: currentList.name, value: currentList.id};
  }

  renderComments() {
    const {dispatch, card} = this.props;
    if (card.comments) {
      return card.comments.map((comment) => {
        console.log(comment);
        return (
          <div className='taskcard-modal--comments'>
            <p></p>
            <ul>
              <li key={comment.id} className='comment-item'>
                <UserAvatar user={comment.creater}/>
                <span>{comment.content}</span>
              </li>
            </ul>
          </div>
        );
      });
    }
  }
  
  renderPomodoro() {
    return;
    return (
      <div className='taskcard-modal--pomodoro'>
        <Pomodoro/>
      </div>
    );
  }

  getCurrentTrack() {
    const {card, normalizedList} = this.props;
    console.log(card);
    return normalizedList.entities[card.taskListId];
  }

  render() {
    const {card, normalizedList} = this.props;
    // TODO duplicable check
    if (!card) {
      return null;
    }

    const currentList = this.getCurrentTrack();
    if (!currentList) {
      return null;
    }

    return (
      <Modal className='taskcard-modal' toggle={this.props.toggleTaskCardModal} close={this.close.bind(this)}>
        <div className='taskcard-modal--top-bar'>
          <div className='top-bar-list-chooser'>
            <span className='top-bar--list-label'>Track:</span>
            <Select defaultItem={this.buildListSelectDefaultItem(currentList)}
                    items={this.buildListSelectItems()}
                    onSelect={this.onChangeTrack.bind(this)}/>
          </div>
          <CloseIcon className='close-icon' onClick={this.close.bind(this)}/>
        </div>

        <div className='taskcard-modal--title'>
          <CheckBox className='title--checkbox' ref='checkbox' defaultChecked={card.isDone} onChange={this.updateDone.bind(this)}/>
          <Textarea className='title--input' ref='title' onKeyDown={this.onTitleKeyDown.bind(this)} defaultValue={card.title} onBlur={this.updateTitle.bind(this)}></Textarea>
        </div>

        <Hr/>

        <div className='taskcard-modal--content'>
          <Textarea placeholder='Add Description' ref='content' onBlur={this.updateContent.bind(this)} defaultValue={card.content}></Textarea>
        </div>

        <div className='taskcard-modal--people'>
          <UserAvatar user={card.creater}/>
        </div>

        {this.renderComments()}
        

        {this.renderPomodoro()}

        <div className='taskcard-modal--comment-input'>
          <Textarea ref='comment' placeholder='add comment'></Textarea>
          <Button onClick={this.postComment.bind(this)} styleType='primary'>Add</Button>
        </div>
        
      </Modal>
    );
  }

  onTitleKeyDown(event) {
    if (isEnterKey(event)) {
      this.updateTitle();
      event.preventDefault();
    }
  }
  
  postComment() {
    const {dispatch, card} = this.props;
    return dispatch(createTaskCardComment(card.id, {
      content: this.refs.comment.value.trim()
    })).then(() => {
      this.refs.comment.value = '';
      this.getCardDetail();
    });
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
    const currentList = this.getCurrentTrack();
    // TODO 优化
    return dispatch(updateTaskCard(this.props.card.id, data))
      .then(() => dispatch(getTaskAllCards(currentList.taskWallId)));
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
    taskLists: state.task.list.lists,
    normalizedList: state.task.list
  };
};

export default connect(mapStateToProps)(CardModal);
