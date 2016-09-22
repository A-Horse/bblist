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
import TaskCard from './TaskCard';

const style = {
  position: 'absolute',
  zIndex: '1000',
  width: '210px'
};

class FloatTaskCard extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      
    };
  }

  componentDidMount() {
    this.props.addToMouseMoveListener(this.updateWithPosition.bind(this));
  }

  updateWithPosition(position) {
    if (!this.props.card) {
      return;
    }
    this.refs.main.style.top = position.top - this.props.info.offsetY - 42 + 'px';
    this.refs.main.style.left = position.left - this.props.info.offsetX + 'px';
  }
  
  render() {
    if (true && this.props.card) {
      return (
        <div style={style} ref='main'>
          <TaskCard card={this.props.card} />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    card: state.taskList.movingCard,
    info: state.taskList.movingCardInfo
  };
};

export default connect(mapStateToProps)(FloatTaskCard);
