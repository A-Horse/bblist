// @flow
import React, { Component } from 'react';
import { Map } from 'immutable';
import { Select, Modal as AntModal, Button, Form, Input, Checkbox } from 'antd';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';
import { EpicAdapterService } from '../../../services/single/epic-adapter.service';
import Actions from '../../../actions/actions';

import 'rxjs/add/operator/take';

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

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
  { toggle: boolean }
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

  updateDetail = (patchObj: any) => {
    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.get('id'),
      ...patchObj
    });
  };

  updateTitle = (event: any) => {
    const title = event.target.value.trim();
    this.updateDetail({ title });
  };

  updateContent = (event: any) => {
    const content = event.target.value.trim();
    this.updateDetail({ content });
  };

  updateDone = (event: any) => {
    const isDone = event.target.checked;
    this.updateDetail({ isDone });
  };

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
      taskListId: trackId
    });
  };

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
        title={this.props.card.get('title')}
        afterClose={() => this.props.history.push(`/task-board/${this.props.match.params.id}`)}
        footer={[
          <Button key="back" onClick={this.close}>
            Done
          </Button>
        ]}
      >
        <FormItem className="headline">
          <Checkbox checked={this.props.card.get('isDone')} onChange={this.updateDone} />
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

          <Input value={this.props.card.get('title')} onChange={this.updateTitle} />
        </FormItem>

        <FormItem label="Description">
          <TextArea
            rows={8}
            defaultValue={this.props.card.get('content')}
            onChange={this.updateContent}
          />
        </FormItem>

        <div className="taskcard-modal--people">
          <UserAvatar user={card.get('creater').toJS()} />
        </div>
      </AntModal>
    );
  }

  deleteTaskCard() {
    const { dispatch } = this.props;
    return dispatch(deleteTaskCard(this.props.card.id));
  }
}
