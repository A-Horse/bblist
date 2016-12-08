import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createTaskCard} from 'actions/task/task-card';
import {getTaskAllCards} from 'actions/task/task-wall';
import {spawnMixinRender} from 'style/theme-render';
import {addBodyEventListenerOnce} from 'actions/event/body';
import {Button} from 'components/widget/Button';
import {Hr} from 'components/widget/Hr';
import UserAvatar from 'components/UserAvatar';
import {MoreIcon} from 'services/svg-icons';

import 'style/page/task/taskcard-creater.scss';

class TaskCardCreater extends Component {
  constructor() {
    super();
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
    const {dispatch} = this.props;
    const data = {
      taskWallId: +this.props.wallId,
      taskListId: +this.props.listId,
      title: this.refs.taskCardTitle.value.trim()
    };
    return dispatch(createTaskCard(data)).then(() => {
      this.clearInput();
      dispatch(getTaskAllCards(this.props.wallId)).then(this.close.bind(this));
    });
  }

  close() {
    this.setState({toggle: false});
  }

  toggle(event) {
    const {dispatch} = this.props;
    this.setState({toggle: true});
    dispatch(addBodyEventListenerOnce(() => {
      this.setState({toggle: false});
    }));
    event.stopPropagation();
  }

  render() {
    if (this.state.toggle) return this.renderBody();
    return this.renderToggle();
  }

  renderToggle() {
    return (
      <div onClick={this.toggle.bind(this)} className='taskcard-creater--toggle'>
        Add a card…
      </div>
    );
  }
  
  renderBody() {
    return (
      <div className='taskcard-creater--body'
           onClick={event => event.stopPropagation()}>
        <div>
          <textarea type='text' ref='taskCardTitle' placeholder='Task Content' />
        </div>
        <div className='taskcard-creater--user'>
          <UserAvatar user={this.props.user}/>
          <span>{this.props.user.username}</span>
        </div>
        <Hr/>
        <div className='taskcard-creater--participants'>
          <div>Participants</div>
          <div>
            <UserAvatar user={this.props.user}/>
          </div>
        </div>
        <Hr/>
        <div className='taskcard-creater--operation'>
          <div>
            <MoreIcon />
            <span>more</span>
          </div>
          <Button styleType='default'>Cancel</Button>
          <Button styleType='primary' onClick={this.createCard.bind(this)}>OK</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.loginedUser
  };
};

export default connect(mapStateToProps)(TaskCardCreater);
