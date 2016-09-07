import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';
import R from 'fw-ramda';

import {deleteTaskWall, getTaskAllCards} from '../actions/task-wall';
import {postTaskCard} from '../actions/task-card';
import {createTaskList, deleteTaskList} from '../actions/task-list';
import {DropMenu} from './widget/DropMenu';
import {ConfirmModal} from './widget/ConfirmModal';
import {getAssets} from '../services/assets-manager';
import {spawnMixinRender} from '../style/theme-render';
import {PageContainer} from './widget/PageContainer';
import {AddIcon, EditIcon, ArrowDownIcon, SettingIcon} from '../services/svg-icons';
import {TaskWallSetting} from './TaskWallSetting';
import {navHeight} from './Nav';
import {Hr} from './widget/Hr';

const styles = {
  container: {
    padding: '10px'
  }
};

const mixinRender = spawnMixinRender(styles);
mixinRender('container', 'lightBackground', 'lightSmallShadow');

@Radium
class TaskCardCreater extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      toggle: false
    };
  }

  createCard() {
    const {dispatch} = this.props;
    const data = {
      taskWallId: +this.props.wallId,
      taskListId: +this.props.listId,
      title: this.refs.taskCardTitle.value.trim()
    };
    dispatch(postTaskCard(data)).then(() => {
      // return dispatch(getTaskAllCards(this.props.wallId));
    });
  }

  render() {
    if (this.state.toggle) return this.renderBody();
    return this.renderToggle();
  }

  renderToggle() {
    return (
      <div onClick={() => {this.setState({toggle: true})}}>
        + New Task
      </div>
    );
  }

  renderBody() {
    return (
      <div style={styles.container}>
        <div>
          <span>title</span>
          <input type='text' ref='taskCardTitle' />
        </div>
        <button onClick={this.createCard} >Post</button>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    
  };
}

export default connect(mapStateToProps)(TaskCardCreater);
