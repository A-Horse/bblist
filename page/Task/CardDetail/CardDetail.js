import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* import { connect } from 'react-redux';
 * import { browserHistory } from 'react-router';*/
import R from 'ramda';
import moment from 'moment';

import { deleteTaskCard, updateTaskCard, getCardDetail } from 'actions/task/task-card';
import { createTaskCardComment } from 'actions/task/task-card-comment';
import { CloseIcon } from 'services/svg-icons';
import UserAvatar from 'components/UserAvatar/UserAvatar';
import { Modal } from 'components/widget/Modal/Modal';
import { CheckBox } from 'components/widget/CheckBox/CheckBox';
import { Pomodoro } from 'components/Pomodoro';
import Textarea from 'react-textarea-autosize';
import { Hr } from 'components/widget/Hr';
import { Select } from 'components/widget/Select';
import { isEnterKey } from 'utils/keyboard';
// import { wrapDispathToAction } from 'utils/wrap-props';

import './CardDetail.scss';

class CardDetail extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  state = {};

  componentWillMount() {
    this.props.actions.GET_CARD_DETAIL_REQUEST({ id: this.props.match.params.cardId });
  }

  close() {
    this.props.history.push(`/task-board/${this.props.match.params.id}`);
  }

  onChangeTrack(track) {
    this.updateTaskCard({ taskListId: track.value });
  }

  getCardDetail() {
    const { dispatch, card } = this.props;
    return dispatch(getCardDetail(card.id));
  }

  buildListSelectItems() {
    return R.compose(
      R.map(list => ({ name: list.name, value: list.id })),
      R.sortBy(R.prop('index')),
      R.values
    )(this.props.normalizedList.entities);
  }

  buildListSelectDefaultItem(currentList) {
    return { name: currentList.name, value: currentList.id };
  }

  renderComments() {
    const { card } = this.props;
    if (card.comments) {
      const comments = card.comments.map(comment => {
        return (
          <li key={comment.id} className="comment-item">
            <UserAvatar user={comment.creater} />
            <span className="comment-item--content">{comment.content}</span>
            <span className="comment-item--date">
              {moment(comment.updated_at ? comment.updated_at : comment.created_at).format(
                'MMMM Do YYYY, h:mm:ss a'
              )}
            </span>
          </li>
        );
      });
      return (
        <div className="taskcard-modal--comments">
          <ul>{comments}</ul>
        </div>
      );
    }
    return null;
  }

  getCurrentTrack() {
    const { card, normalizedList } = this.props;
    return normalizedList.entities[card.taskListId];
  }

  render() {
    const { card, tracks } = this.props;
    /* const cardId = this.props.params.cardId;
     * const card = normalizedCards.entities[cardId];*/

    // TODO duplicable check

    if (!card) {
      return null;
    }
    // const currentList = this.getCurrentTrack();
    /* if (!tracks) {
     *   return null;
     * }*/
    console.log('---', card);
    return (
      <Modal className="taskcard-modal" toggle={true} close={this.close.bind(this)}>
        <div className="taskcard-modal--top-bar">
          {/* <div className="top-bar-list-chooser">
              <span className="top-bar--list-label">Track:</span>
              <Select
              defaultItem={this.buildListSelectDefaultItem(tracks)}
              items={this.buildListSelectItems()}
              onSelect={this.onChangeTrack.bind(this)}
              />
              </div> */}
          <CloseIcon className="close-icon" onClick={this.close.bind(this)} />
        </div>

        <div className="taskcard-modal--title">
          <CheckBox
            className="title--checkbox"
            ref="checkbox"
            defaultChecked={card.get('isDone')}
            onChange={this.updateDone.bind(this)}
          />
          <Textarea
            className="title--input"
            ref="title"
            onKeyDown={this.onTitleKeyDown.bind(this)}
            defaultValue={card.get('title')}
            onBlur={this.updateTitle.bind(this)}
          />
        </div>

        <Hr />

        <div className="taskcard-modal--content">
          <Textarea
            placeholder="Add Description"
            ref="content"
            onBlur={this.updateContent.bind(this)}
            defaultValue={card.get('content')}
          />
        </div>

        <div className="taskcard-modal--people">
          <UserAvatar user={card.get('creater').toJS()} />
        </div>

        {/* {this.renderComments()} */}

        <div className="taskcard-modal--comment-input">
          <Textarea
            onKeyDown={this.onCommentInputKeyDown.bind(this)}
            ref="comment"
            placeholder="add comment (Enter to post)"
          />
        </div>
      </Modal>
    );
  }

  onCommentInputKeyDown(event) {
    if (!isEnterKey(event)) {
      return;
    }
    this.postComment();
  }

  onTitleKeyDown(event) {
    if (isEnterKey(event)) {
      this.updateTitle();
      event.preventDefault();
    }
  }

  postComment() {
    const { dispatch, card } = this.props;
    return dispatch(
      createTaskCardComment(card.id, {
        content: this.refs.comment.value.trim()
      })
    ).then(() => {
      this.refs.comment.value = '';
      this.getCardDetail();
    });
  }

  updateTitle() {
    const title = this.refs.title.value.trim();
    this.updateTaskCard({ title });
  }

  updateDone() {
    const isDone = this.refs.checkbox.checked;
    this.updateTaskCard({ isDone });
  }

  updateContent() {
    const content = this.refs.content.value.trim();
    this.updateTaskCard({ content });
  }

  updateTaskCard(data) {
    const { dispatch } = this.props;
    const currentList = this.getCurrentTrack();
    return dispatch(updateTaskCard(this.props.card.id, data));
  }

  deleteTaskCard() {
    const { dispatch } = this.props;
    return dispatch(deleteTaskCard(this.props.card.id));
  }
}
/*
 * const mapStateToProps = (state, props) => {
 *   return {
 *     card: state.task.card.entities[props.params.cardId],
 *     normalizedCards: state.task.card,
 *     taskLists: state.task.list.lists,
 *     normalizedList: state.task.list
 *   };
 * };
 *
 * const actions = {
 *   getCardDetail
 * };
 * */
export default CardDetail;
