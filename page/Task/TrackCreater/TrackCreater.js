import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTaskCard } from 'actions/task/task-card';
import { getTaskAllCards } from 'actions/task/task-wall';
import { createTaskList } from 'actions/task/task-list';
import { addBodyEventListenerOnce } from 'actions/event/body';
import { Button } from 'components/widget/Button/Button';
import { Hr } from 'components/widget/Hr';
import UserAvatar from 'components/UserAvatar';
import { MoreIcon, AddIcon } from 'services/svg-icons';
import { isEnterKey } from 'utils/keyboard';
import ClickOutSide from 'components/utils/ClickOutSide';
import { IconAdd } from 'services/image-icon';

import './TrackCreater.scss';

class TrackCreater extends Component {
  state = {
    toggle: false
  };

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  addTrack() {
    const name = this.refs.name.value.trim();
    this.props.addTrack({ name });
  }

  toggle() {
    this.setState({ toggle: true });
  }

  close() {
    this.setState({ toggle: false });
  }

  onKeyDown(event) {
    if (isEnterKey(event)) {
      this.addTrack();
      this.close();
    }
  }

  render() {
    return (
      <div className="tasklist-creater">
        {this.state.toggle ? (
          <div className="task-list-input">
            <input
              type="text"
              ref="name"
              placeholder="write track name"
              onKeyDown={this.onKeyDown}
            />
            <Button className="creater-button" styleType="primary" onClick={this.addTrack}>
              OK
            </Button>
            <Button onClick={this.close}>Cancel</Button>
          </div>
        ) : (
          <div onClick={this.toggle} className="task-list--toggle">
            <IconAdd className="icon-add" />
            <span>Add a Track...</span>
          </div>
        )}
      </div>
    );
  }
}

export default TrackCreater;
