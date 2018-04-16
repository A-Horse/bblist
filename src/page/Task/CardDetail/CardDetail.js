// @flow
import React, { Component } from 'react';
import moment from 'moment';
import Textarea from 'react-textarea-autosize';

import { deleteTaskCard, updateTaskCard, getCardDetail } from '../../../actions/task/task-card';
import { createTaskCardComment } from '../../../actions/task/task-card-comment';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';
import { CheckBox } from '../../../components/widget/CheckBox/CheckBox';
import { isEnterKey } from '../../../utils/keyboard';
import { Select, Modal as AntModal, Button } from 'antd';
import { Map } from 'immutable';

const Option = Select.Option;

import './CardDetail.less';

export class CardDetail extends Component<
  {
    actions: any,
    trackMap: any,
    match: any,
    history: any,
    board: Map<any>,
    card: Map<any>
  },
  { toggle: boolean }
> {
  state = { toggle: true };

  componentWillMount() {
    this.props.actions.GET_CARD_DETAIL_REQUEST({ id: this.props.match.params.cardId });
  }

  close = () => {
    this.setState({ toggle: false });
  };

  getCardDetail() {
    const { dispatch, card } = this.props;
    return dispatch(getCardDetail(card.id));
  }

  buildListSelectItems() {
    return this.props.trackMap
      .map(track => {
        return { value: track.get('id'), name: track.get('name') };
      })
      .toArray();
  }

  buildListSelectDefaultItem() {
    const currentTrack = this.props.trackMap.find(track => {
      return track.get('cards').find(cardId => String(cardId) === this.props.match.params.cardId);
    });
    if (!currentTrack) {
      return null;
    }
    return { value: currentTrack.get('id'), name: currentTrack.get('name') };
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
    const { card } = this.props;

    if (!card) {
      return null;
    }

    return (
      <AntModal
        className="taskcard-modal"
        visible={this.state.toggle}
        onCancel={this.close}
        afterClose={() => this.props.history.push(`/task-board/${this.props.match.params.id}`)}
        footer={[
          <Button key="back" onClick={this.close}>
            Done
          </Button>
        ]}
      >
        <div className="taskcard-modal--top-bar">
          <div className="top-bar-list-chooser">
            <span className="top-bar--list-label">Track:</span>

            <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.updateBelongTrack}>
              {this.props.trackMap.toArray().map(track => {
                return (
                  <Option key={track.get('id')} value={track.get('id')}>
                    {track.get('name') + track.get('id')}
                  </Option>
                );
              })}
            </Select>
            {/*
                <Select
                defaultItem={this.buildListSelectDefaultItem()}
                items={this.buildListSelectItems()}
                onSelect={selected =>
                this.props.actions.UPDATE_TASK_CARD_REQUEST({
                id: card.get('id'),
                taskListId: selected.value
                })
                }
                /> */}
          </div>
          <i className="fa fa-times" aria-hidden="true" onClick={this.close} />
        </div>

        <div className="taskcard-modal--title">
          <CheckBox
            className="title--checkbox"
            defaultChecked={card.get('isDone')}
            onChange={value => {
              this.props.actions.UPDATE_TASK_CARD_REQUEST({
                id: card.get('id'),
                isDone: value
              });
            }}
          />
          <Textarea
            className="title--input"
            ref="title"
            onKeyDown={this.onTitleKeyDown.bind(this)}
            defaultValue={card.get('title')}
            onBlur={this.updateTitle.bind(this)}
          />
        </div>

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
      </AntModal>
    );
  }

  onCommentInputKeyDown(event: Event) {
    if (!isEnterKey(event)) {
      return;
    }
    this.postComment();
  }

  onTitleKeyDown(event: Event) {
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

  updateBelongTrack = (trackId: string) => {
    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.get('id'),
      trackId
    });

    this.props.actions.GET_TASK_TRACK_CARD_REQUEST({
      boardId: +this.props.board.get('id'),
      // TODO rename
      trackId: +this.props.card.get('taskListId')
    });

    this.props.actions.GET_TASK_TRACK_CARD_REQUEST({
      boardId: +this.props.board.get('id'),
      trackId: trackId
    });
  };

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
