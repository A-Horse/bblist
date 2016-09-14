import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

import {deleteTaskWall, getTaskAllCards} from '../../actions/task/task-wall';
import {createTaskCard} from '../../actions/task/task-card';
import {createTaskList, deleteTaskList} from '../../actions/task/task-list';
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
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('card', JSON.stringify(this.props.card));
  }
  
  render() {
    const {card} = this.props;
    const activeRole = card.creater;
    return (
      <div style={styles.card} draggable='true' onDragStart={this.onDragStart.bind(this)}>
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
}

export default connect(mapStateToProps)(TaskCard);
