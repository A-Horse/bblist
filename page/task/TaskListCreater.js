import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createTaskCard} from 'actions/task/task-card';
import {getTaskAllCards} from 'actions/task/task-wall';
import {createTaskList} from 'actions/task/task-list';
import {spawnMixinRender} from 'style/theme-render';
import {addBodyEventListenerOnce} from 'actions/event/body';
import {Button} from 'components/widget/Button';
import {Hr} from 'components/widget/Hr';
import UserAvatar from 'components/UserAvatar';
import {MoreIcon, AddIcon} from 'services/svg-icons';

import 'style/page/task/tasklist-creater.scss';

class TaskListCreater extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      toggle: false
    };
  }

  createTaskList() {
    const {dispatch} = this.props;
    const name = this.refs.name.value.trim();
    // TODO 优化？不请求后台了?
    return dispatch(createTaskList(this.props.boardId, {name})).then(() => dispatch(getTaskAllCards(this.props.boardId)));
  }

  toggle(event) {
    const {dispatch} = this.props;
    this.setState({toggle: true});
    dispatch(addBodyEventListenerOnce(() => {
      this.setState({toggle: false});
    }));
    event.stopPropagation();
  }

  onKeyDown(event) {
    if (event.which === 13) {
      this.createTaskList();
      this.setState({toggle: false});
    }
  }

  renderBody() {
    if (this.state.toggle) {
      return this.renderInput();
    }
    return this.renderToggle();
  }

  renderInput() {
    return <input ref='name' onKeyDown={this.onKeyDown.bind(this)} onClick={(event) => event.stopPropagation()}/>;
  }

  renderToggle() {
    return (
      <div onClick={this.toggle.bind(this)} className='task-list--toggle'>
        <AddIcon className='add-icon'/>
        <span>Create List</span>
      </div>
    );
  }

  render() {
    return (
      <div className='tasklist-creater' key='createList'>
        {this.renderBody()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(TaskListCreater);
