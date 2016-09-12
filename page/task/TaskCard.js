import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

import {deleteTaskWall, getTaskAllCards} from '../../actions/task-wall';
import {postTaskCard} from '../../actions/task-card';
import {createTaskList, deleteTaskList} from '../../actions/task-list';
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

  render() {
    const {card} = this.props;
    const activeRole = card.creater;
    return (
      <div style={styles.card} draggable="true">
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
