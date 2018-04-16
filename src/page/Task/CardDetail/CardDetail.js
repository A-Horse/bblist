// @flow
import React, { Component } from 'react';
import moment from 'moment';
import Textarea from 'react-textarea-autosize';
import { Select, Modal as AntModal, Button, Form, Input } from 'antd';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';
import { CheckBox } from '../../../components/widget/CheckBox/CheckBox';
import { isEnterKey } from '../../../utils/keyboard';
import { Map } from 'immutable';
import { EpicAdapterService } from '../../../services/single/epic-adapter.service';
import Actions from '../../../actions/actions';

import 'rxjs/add/operator/take';

const Option = Select.Option;
const FormItem = Form.Item;

import './CardDetail.less';

export class CardDetail extends Component<
  {
    actions: any,
    trackMap: any,
    match: any,
    history: any,
    board: Map<any>,
    card: Map<any>,
    epicAdapterService: EpicAdapterService
  },
  { toggle: boolean, title: string }
> {
  state = { toggle: true };

  componentWillMount() {
    this.getCardDetail();
  }

  close = () => {
    this.setState({ toggle: false });
  };

  getCardDetail() {
    this.props.actions.GET_CARD_DETAIL_REQUEST({ id: this.props.match.params.cardId });
  }

  /* findCurrentTrack() {
   *   const currentTrack = this.props.trackMap.find(track => {
   *     return track.get('cards').find(cardId => String(cardId) === this.props.match.params.cardId);
   *   });
   *   return currentTrack;
   * }
   */

  /* getCurrentTrack() {
   *   const { card, normalizedList } = this.props;
   *   return normalizedList.entities[card.taskListId];
   * }
   */

  updateDetail(patchObj: any) {
    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.get('id'),
      ...patchObj
    });
  }

  updateBelongTrack = (trackId: string) => {
    const originalCardBelongTrackId: number = this.props.card.get('taskListId');

    this.props.epicAdapterService.input$
      .ofType(Actions.UPDATE_TASK_CARD.SUCCESS)
      .take(1)
      .subscribe(() => {
        this.props.actions.GET_TASK_TRACK_CARD_REQUEST({
          boardId: +this.props.board.get('id'),
          trackId: originalCardBelongTrackId
        });

        this.props.actions.GET_TASK_TRACK_CARD_REQUEST({
          boardId: +this.props.board.get('id'),
          trackId: trackId
        });
      });

    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.get('id'),
      trackId
    });
  };

  render() {
    const { card } = this.props;

    if (!card) {
      return null;
    }

    const formItemLayout = {
      labelCol: {
        sm: { span: 4 }
      },
      wrapperCol: {
        sm: { span: 16 }
      }
    };

    return (
      <AntModal
        className="taskcard-modal"
        visible={this.state.toggle}
        onCancel={this.close}
        title={this.props.card.get('title')}
        afterClose={() => this.props.history.push(`/task-board/${this.props.match.params.id}`)}
        footer={[
          <Button key="back" onClick={this.close}>
            Done
          </Button>
        ]}
      >
        <Select defaultValue={card.get('taskListId')} onChange={this.updateBelongTrack}>
          {this.props.trackMap.toArray().map(track => {
            return (
              <Option
                key={track.get('id')}
                value={track.get('id')}
                disabled={card.get('taskListId') === track.get('id')}
              >
                {track.get('name')}
              </Option>
            );
          })}
        </Select>

        <Input value={this.props.card.get('title')} onChange={updateTitle} />

        <FormItem {...formItemLayout} label="Track">
          <Textarea
            className="title--input"
            ref="title"
            onKeyDown={this.onTitleKeyDown.bind(this)}
            defaultValue={card.get('title')}
            onBlur={this.updateTitle.bind(this)}
          />
        </FormItem>

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
