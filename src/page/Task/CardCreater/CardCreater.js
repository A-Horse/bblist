// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../components/widget/Button/Button';
import { UserAvatar } from '../../../components/UserAvatar/UserAvatar';
import ClickOutSide from '../../../components/utils/ClickOutSide';
import { timeout } from '../../../utils/timeout';

import { Select } from 'antd';

const Option = Select.Option;

import './CardCreater.scss';

class CardCreater extends Component<
  {
    loginedUser: PropTypes.object.isRequired,
    addTaskCard: PropTypes.func.isRequired,
    track: PropTypes.object.isRequired
  },
  {
    title: '',
    toggle: false,
    beforeClose: false,
    type: 'STORY'
  }
> {
  state = {
    title: '',
    toggle: false,
    beforeClose: false,
    type: 'STORY'
  };

  clearInput() {
    this.taskCardTitle.value = '';
  }

  addCard = () => {
    this.props.addTaskCard({ title: this.state.title.trim(), type: this.state.type });
    this.clearInput();
    this.close();
  };

  close = async () => {
    this.setState({ beforeClose: true });
    await timeout(200);
    this.setState({ toggle: false, beforeClose: false });
  };

  toggle = async () => {
    this.setState({ toggle: true });
    await timeout();
    window.document.querySelector(
      `[data-id="${this.props.track.get('id')}"].task-track .task-track--body`
    ).scrollTop = 10000;
  };

  handleTaskTypeChange = value => {
    this.setState({ type: value });
  };

  render() {
    if (this.state.toggle)
      return (
        <ClickOutSide onClickOutside={this.close}>
          <div
            className={`taskcard-creater--body${this.state.beforeClose ? ' before-close' : ''}`}
            onClick={event => event.stopPropagation()}
          >
            <div>
              <textarea
                autoFocus
                type="text"
                ref={ref => (this.taskCardTitle = ref)}
                placeholder="Task Content"
                onChange={event => this.setState({ title: event.target.value })}
                onKeyPress={event => {
                  if (event.ctrlKey && event.key === 'Enter') this.addCard();
                }}
              />
            </div>

            <div>
              <Select
                defaultValue="STORY"
                style={{ width: 120 }}
                onChange={this.handleTaskTypeChange}
              >
                <Option value="STORY">Story</Option>
                <Option value="TODO">Todo</Option>
              </Select>
            </div>

            <div className="taskcard-creater--user">
              <UserAvatar user={this.props.loginedUser.toJS()} />
              <span>{this.props.loginedUser.get('username')}</span>
            </div>
            <div className="taskcard-creater--participants">
              <div>Participants</div>
              <div>
                <UserAvatar user={this.props.loginedUser.toJS()} />
              </div>
            </div>
            <div className="taskcard-creater--operation">
              <div>
                <i className="fa fa-ellipsis-h" aria-hidden="true" />
                <span>more</span>
              </div>
              <div>
                <Button className="btn-cancel" styleType="default" onClick={this.close}>
                  Cancel
                </Button>
                <Button styleType="primary" onClick={this.addCard}>
                  OK
                </Button>
              </div>
            </div>
          </div>
        </ClickOutSide>
      );
    return (
      <div onClick={this.toggle} className="taskcard-creater--toggle">
        <i className="fa fa-plus" aria-hidden="true" />
        <span>Add a card...</span>
      </div>
    );
  }
}

export default CardCreater;
