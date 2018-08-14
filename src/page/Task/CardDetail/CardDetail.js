// @flow
import React, { Component } from 'react';
import { Map } from 'immutable';
import { Select, Modal, Icon, Menu, Dropdown, Button, Form, Input, Row, Col, Checkbox } from 'antd';
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

  destoryCard() {
    this.props.actions.DESTORY_TASK_CARD_REQUEST({
      id: this.props.card.get('id')
    });
  }

  close = () => {
    this.setState({ toggle: false });
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
    const originalCardBelongTrackId: number = this.props.card.get('taskTrackId');

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
      taskTrackId: trackId
    });
  };

  render() {
    const { card } = this.props;

    if (!card) {
      return null;
    }

    const menu = (
      <Menu>
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
      </Menu>
    );

    return (
      <Modal
        className="taskcard-modal"
        visible={this.state.toggle}
        onCancel={this.close}
        title={
          <div>
            <Select defaultValue={card.get('taskTrackId')} onChange={this.updateBelongTrack}>
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
                marginRight: '20px',
                marginTop: '10px',
                position: 'relative',
                zIndex: '1000'
              }}
            >
              <Dropdown overlay={menu}>
                <Icon type="down" style={{ fontSize: 18 }} />
              </Dropdown>
            </div>
          </div>
        }
        afterClose={() => this.props.history.push(`/task-board/${this.props.match.params.id}`)}
        footer={[
          <Button key="back" onClick={this.close}>
            Done
          </Button>
        ]}
      >
        <FormItem>
          <Row>
            <Col span={2}>
              <Checkbox checked={this.props.card.get('isDone')} onChange={this.updateDone} />
            </Col>
            <Col span={22}>
              <Input value={this.props.card.get('title')} onChange={this.updateTitle} />
            </Col>
          </Row>
        </FormItem>

        <FormItem label="Description:">
          <TextArea
            rows={8}
            defaultValue={this.props.card.get('content')}
            onChange={this.updateContent}
          />
        </FormItem>
      </Modal>
    );
  }
}
