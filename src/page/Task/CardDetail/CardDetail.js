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

  close = () => {
    this.setState({ toggle: false });
    this.props.history.replace(`/task-board/${this.props.match.params.id}`);
  };

  getCardDetail() {
    this.props.actions.GET_CARD_DETAIL_REQUEST({ id: this.props.match.params.cardId });
  }

  handleDestoryCard() {
    this.props.actions.DESTORY_TASK_CARD_REQUEST({
      id: this.props.card.get('id')
    });
    this.close();
  }

  handleArchiveCard() {
    this.props.actions.ARCHIVE_TASK_CARD_REQUEST({
      id: this.props.card.get('id')
    });
    this.close();
  }

  handleUpdateDetail = (patchDetail: any) => {
    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.get('id'),
      ...patchDetail
    });
  };

  handleUpdateTitle = (event: SyntheticEvent<HTMLInputElement>) => {
    const title = event.target.value;
    this.handleUpdateDetail({ title });
  };

  handleUpdateContent = (event: any) => {
    const content = event.target.value.trim();
    this.handleUpdateDetail({ content });
  };

  handleUpdateDone = (event: any) => {
    this.handleUpdateDetail({ isDone: event.target.checked ? 'DONE' : 'UNDONE' });
  };

  handleUpdateBelongTrack = (trackId: string) => {
    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.get('id'),
      taskTrackId: trackId
    });
  };

  handleTaskTypeChange = () => {};

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
              this.handleDestoryCard();
            }}
          >
            <Icon type="delete" />
            Delete task
          </div>
        </Menu.Item>

        <Menu.Item>
          <div
            onClick={() => {
              this.handleArchiveCard();
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
            <Select
              className="track-selecter"
              defaultValue={card.get('taskTrackId')}
              onChange={this.handleUpdateBelongTrack}
            >
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
              <Checkbox checked={this.props.card.get('status') === 'DONE'} onChange={this.handleUpdateDone} />
            )}
            <Input className="title-input" value={this.props.card.get('title')} onChange={this.handleUpdateTitle} />
          </Row>
        </FormItem>

        <FormItem label="Description:">
          <TextArea rows={8} defaultValue={this.props.card.get('content')} onChange={this.handleUpdateContent} />
        </FormItem>

        <FormItem>
          <Select defaultValue="STORY" style={{ width: 120 }} onChange={this.handleTaskTypeChange}>
            <Option value="STORY">Story</Option>
            <Option value="TODO">Todo</Option>
          </Select>
        </FormItem>
      </Modal>
    );
  }
}
