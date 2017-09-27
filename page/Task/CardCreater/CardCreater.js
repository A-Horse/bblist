import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/widget/Button/Button';
import { Hr } from 'components/widget/Hr';
import UserAvatar from 'components/UserAvatar';
import { MoreIcon } from 'services/svg-icons';
import { IconAdd } from 'services/image-icon';

import './CardCreater.scss';

class CardCreater extends Component {
  static propTypes = {
    loginedUser: PropTypes.object.isRequired,
    addTaskCard: PropTypes.func.isRequired
  };

  state = {
    title: '',
    toggle: false
  };

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this.addCard = this.addCard.bind(this);
  }

  clearInput() {
    this.taskCardTitle.value = '';
  }

  addCard() {
    this.props.addTaskCard({ title: this.state.title.trim() });
    this.clearInput();
    this.close();
  }

  close() {
    this.setState({ toggle: false });
  }

  toggle() {
    this.setState({ toggle: true });
  }

  render() {
    if (this.state.toggle)
      return (
        <div className="taskcard-creater--body" onClick={event => event.stopPropagation()}>
          <div>
            <textarea
              type="text"
              ref={ref => (this.taskCardTitle = ref)}
              placeholder="Task Content"
              onChange={event => this.setState({ title: event.target.value })}
              onKeyPress={event => {
                if (event.ctrlKey && event.key === 'Enter') this.addCard.bind(this)();
              }}
            />
          </div>
          <div className="taskcard-creater--user">
            <UserAvatar user={this.props.loginedUser.toJS()} />
            <span>{this.props.loginedUser.get('username')}</span>
          </div>
          <Hr />
          <div className="taskcard-creater--participants">
            <div>Participants</div>
            <div>
              <UserAvatar user={this.props.loginedUser.toJS()} />
            </div>
          </div>
          <Hr />
          <div className="taskcard-creater--operation">
            <div>
              <MoreIcon />
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
