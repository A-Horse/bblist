import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

import {deleteTaskWall, getTaskAllCards} from '../../actions/task/task-wall';
import {taskCardDragLeaveStart, updateTaskCard} from '../../actions/task/task-card';
import {createTaskList, deleteTaskList} from '../../actions/task/task-list';
import {openTaskCardModal} from '../../actions/event/task-wall';
import {DropMenu} from '../../components/widget/DropMenu';
import {ConfirmModal} from '../../components/widget/ConfirmModal';
import {PageContainer} from '../../components/widget/PageContainer';
import {Hr} from '../../components/widget/Hr';
import {getAssets} from '../../services/assets-manager';
import {spawnMixinRender} from '../../style/theme-render';
import {AddIcon, EditIcon, ArrowDownIcon, SettingIcon} from '../../services/svg-icons';
import {TaskWallSetting} from './TaskWallSetting';
import {navHeight} from '../../components/Nav';
import UserAvatar from '../../components/UserAvatar';

const styles = {
  card: {
    margin: '0.2rem 0',
    padding: '4px 8px',
    borderRadius: '1px'
  }
};

const themeRender = spawnMixinRender(styles);
themeRender('card', 'lightBackground', 'lightSmallShadow');

@Radium
class TaskCard extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      
    };
  }

  onDragStart(event) {
    const {dispatch} = this.props;
    event.dataTransfer.dropEffect = 'move';
    // event.dataTransfer.setData('card', JSON.stringify(this.props.card));
    
    const width = this.refs.main.offsetWidth;
    const height = this.refs.main.offsetHeight;
    return dispatch(taskCardDragLeaveStart(this.props.card, {
      width,
      height,
      formListId: this.props.listId
    }));
  }

  openTaskCardModal() {
    const {dispatch} = this.props;
    return dispatch(openTaskCardModal(this.props.card));
  }

  finishTask() {
    const {dispatch} = this.props;
    if (this.props.card.isDone) {
      return;
    }
    return dispatch(updateTaskCard(this.props.card.id, {isDone: true}));
  }
  
  render() {
    const {card} = this.props;
    const activeRole = card.creater;
    return (
      <div ref='main' style={styles.card} draggable='true' onDragStart={this.onDragStart.bind(this)}>
        <p>{card.title}</p>
        <UserAvatar user={activeRole}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wallData: state.taskWall.wallData
  };
};

export default connect(mapStateToProps)(TaskCard);
