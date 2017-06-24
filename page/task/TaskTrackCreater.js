import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createTaskCard} from 'actions/task/task-card';
import {getTaskAllCards} from 'actions/task/task-wall';
import {createTaskList} from 'actions/task/task-list';
import {addBodyEventListenerOnce} from 'actions/event/body';
import {Button} from 'components/widget/Button';
import {Hr} from 'components/widget/Hr';
import UserAvatar from 'components/UserAvatar';
import {MoreIcon, AddIcon} from 'services/svg-icons';
import {isEnterKey} from 'utils/keyboard';
import ClickOutSide from 'components/utils/ClickOutSide';
import { IconAdd } from 'services/image-icon';

import 'style/page/task/tasklist-creater.scss';

class TaskTrackCreater extends Component {

  componentWillMount() {
    this.state = {
      toggle: false
    };
  }

  createTaskTrack() {
    const {dispatch} = this.props;
    const name = this.refs.name.value.trim();
    // TODO 优化？不请求后台了?
    return dispatch(createTaskList(this.props.boardId, {name}))
      .then(() => {
        this.close();
        dispatch(getTaskAllCards(this.props.boardId))
      });
  }

  toggle() {
    this.setState({toggle: true});
  }

  close() {
    this.setState({toggle: false});
  }

  onKeyDown(event) {
    if (isEnterKey(event)) {
      this.createTaskTrack();
      this.close();
    }
  }

  renderBody() {
    if (this.state.toggle) {
      return this.renderInput();
    }
    return this.renderToggle();
  }

  renderInput() {
    return (
      <div className='task-list-input'>
        <input type='text' ref='name' placeholder='write track name' onKeyDown={::this.onKeyDown}/>
        <Button className='creater-button' styleType='primary' onClick={::this.createTaskTrack}>OK</Button>
        <Button onClick={::this.close}>Cancel</Button>
      </div>
    );
  }

  renderToggle() {
    return (
      <div onClick={::this.toggle} className='task-list--toggle'>
        <IconAdd className='icon-add'/>
        <span>Add a Track...</span>
      </div>
    );
  }

  render() {
    return (
      <div className='tasklist-creater'>
        {this.renderBody()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(TaskTrackCreater);
