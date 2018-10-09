// @flow
import React, { Component } from 'react';
import { Map } from 'immutable';
import { Select, Modal, Icon, Menu, Dropdown, Form, Input, Row, Checkbox } from 'antd';

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
    card: Map<any>
  },
  { toggle: boolean }
> {
  state = { toggle: true };

  componentWillMount() {
    this.getCardDetail();
  }

  destoryCard() {
    this.props.actions.DESTORY_TASK_CARD_REQUEST({
      id: this.props.card.get('id')
    });
    this.close();
  }

  archiveCard() {
    this.props.actions.ARCHIVE_TASK_CARD_REQUEST({
      id: this.props.card.get('id')
    });
    this.close();
  }

  close = () => {
    this.setState({ toggle: false });
    this.props.history.replace(`/task-board/${this.props.match.params.id}`);
  };

  getCardDetail() {
    this.props.actions.GET_CARD_DETAIL_REQUEST({ id: this.props.match.params.cardId });
  }

  updateDetail = (patchObj: any) => {
    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.get('id'),
      ...patchObj
    });
  };

  updateTitle = (event: SyntheticEvent<HTMLInputElement>) => {
    const title = event.target.value;
    this.updateDetail({ title });
  };

  updateContent = (event: any) => {
    const content = event.target.value.trim();
    this.updateDetail({ content });
  };

  updateDone = (event: any) => {
    this.updateDetail({ isDone: event.target.checked ? 'DONE' : 'UNDONE' });
  };

  updateBelongTrack = (trackId: string) => {
    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.get('id'),
      taskTrackId: trackId
    });
  };

  render() {
    const { card } = this.props;

    if (!card) {
      return null;
    }

    const menu = (
      <Menu className="card-detail-dropmenu">
        <Menu.Item>
          <div
            onClick={() => {
              this.destoryCard();
            }}
          >
            <Icon type="delete" />
            Delete task
          </div>
        </Menu.Item>

        <Menu.Item>
          <div
            onClick={() => {
              this.archiveCard();
            }}
          >
            <Icon type="flag" />
            Archive
          </div>
        </Menu.Item>
      </Menu>
    );

    return (
      <Modal
        className="taskcard-modal"
        visible={this.state.toggle}
        onCancel={this.close}
        title={
          <div>
            <Icon type="swap" theme="outlined" />
            <Select className="track-selecter" defaultValue={card.get('taskTrackId')} onChange={this.updateBelongTrack}>
              {this.props.trackMap.toArray().map(track => {
                return (
                  <Option
                    key={track.get('id')}
                    value={track.get('id')}
                    disabled={card.get('taskTrackId') === track.get('id')}
                  >
                    {track.get('name')}
                  </Option>
                );
              })}
            </Select>
            <div
              style={{
                cursor: 'pointer',
                float: 'right',
                marginRight: '30px',
                marginTop: '10px',
                position: 'relative',
                zIndex: '1000'
              }}
            >
              <Dropdown overlay={menu} placement="bottomRight">
                <Icon type="ellipsis" style={{ fontSize: 22 }} />
              </Dropdown>
            </div>
          </div>
        }
        afterClose={() => {}}
        footer={null}
      >
        <FormItem>
          <Row>
            {this.props.card.get('type') === 'TODO' && (
              <Checkbox checked={this.props.card.get('status') === 'DONE'} onChange={this.updateDone} />
            )}
            <Input className="title-input" value={this.props.card.get('title')} onChange={this.updateTitle} />
          </Row>
        </FormItem>

        <FormItem label="Description:">
          <TextArea rows={8} defaultValue={this.props.card.get('content')} onChange={this.updateContent} />
        </FormItem>
      </Modal>
    );
  }
}
