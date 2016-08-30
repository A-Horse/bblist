import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import R from 'fw-ramda';

import {deleteTaskWall, getTaskAllCards} from '../actions/task-wall';
import {postTaskCard} from '../actions/task-card';
import {createTaskList, deleteTaskList} from '../actions/task-list';
import {DropMenu} from './widget/DropMenu';
import {ConfirmModal} from './widget/ConfirmModal';
import {getAssets} from '../services/assets-manager';
import {spawnThemeRender} from '../style/theme-render';
import {PageContainer} from './widget/PageContainer';
import {AddIcon, EditIcon, ArrowDownIcon, SettingIcon} from '../services/svg-icons';
import {TaskWallSetting} from './TaskWallSetting';
import {navHeight} from './Nav';
import {Hr} from './widget/Hr';

const styles = {
  card: {
    margin: '0.2rem 0',
    padding: '4px 8px',
    borderRadius: '1px',
    height: '48px'
  }
};

const themeRender = spawnThemeRender(styles);
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
    return (
        <div style={styles.card}>
          <p>{card.title}</p>     
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
