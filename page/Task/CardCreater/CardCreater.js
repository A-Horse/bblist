import React, { Component } from 'react';
import { createTaskCard } from 'actions/task/task-card';
import { getTaskAllCards } from 'actions/task/task-wall';
import { addBodyEventListenerOnce } from 'actions/event/body';
import { Button } from 'components/widget/Button/Button';
import { Hr } from 'components/widget/Hr';
import UserAvatar from 'components/UserAvatar';
import { MoreIcon } from 'services/svg-icons';
import { IconAdd } from 'services/image-icon';

// import 'style/page/task/taskcard-creater.scss';
import './CardCreater.scss';

class CardCreater extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this.createCard = this.createCard.bind(this);
  }

  componentWillMount() {
    this.state = {
      toggle: false
    };
  }

  clearInput() {
    this.refs.taskCardTitle.value = '';
  }

  createCard() {
    const data = {
      taskBoardId: +this.props.wallId,
      taskListId: +this.props.listId,
      title: this.refs.taskCardTitle.value.trim()
    };
    return dispatch(createTaskCard(data)).then(() => {
      this.clearInput();
      dispatch(getTaskAllCards(this.props.wallId)).then(this.close.bind(this));
    });
  }

  close() {
    this.setState({ toggle: false });
  }

  toggle(event) {
    this.setState({ toggle: true });
  }

  render() {
    if (this.state.toggle) return this.renderBody();
    return this.renderToggle();
  }

  renderToggle() {
    return (
      <div onClick={this.toggle} className="taskcard-creater--toggle">
        <IconAdd className="icon-add" />
        <span>Add a card...</span>
      </div>
    );
  }

  renderBody() {
    return (
      <div className="taskcard-creater--body" onClick={event => event.stopPropagation()}>
        <div>
          <textarea
            type="text"
            ref="taskCardTitle"
            placeholder="Task Content"
            onKeyPress={event => {
              if (event.ctrlKey && event.key === 'Enter') this.createCard.bind(this)();
            }}
          />
        </div>
        <div className="taskcard-creater--user">
          <UserAvatar user={this.props.loginedUser.toJS()} />
          <span>
            {this.props.loginedUser.get('username')}
          </span>
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
            <Button styleType="primary" onClick={this.createCard}>
              OK
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default CardCreater;
/* const mapStateToProps = state => {
 *   return {
 *     user: state.auth.loginedUser
 *   };
 * };
 *
 * export default connect(mapStateToProps)(TaskCardCreater);*/
