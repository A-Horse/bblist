import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

import {deleteTaskWall, getTaskAllCards} from 'actions/task/task-wall';
import {taskCardDragLeaveStart, updateTaskCard, setCurrentCard} from 'actions/task/task-card';
import {createTaskList, deleteTaskList} from 'actions/task/task-list';
import {openTaskCardModal} from 'actions/event/task-wall';
import {DropList} from 'components/widget/DropList';
import {ConfirmModal} from 'components/widget/ConfirmModal';
import {PageContainer} from 'components/widget/PageContainer';
import {Hr} from 'components/widget/Hr';
import {getAssets} from 'services/assets-manager';
import {spawnMixinRender} from 'style/theme-render';
import {AddIcon, EditIcon, ArrowDownIcon, SettingIcon} from 'services/svg-icons';
import {navHeight} from 'components/Nav';
import UserAvatar from 'components/UserAvatar';
import {TaskWallSetting} from './TaskWallSetting';

const styles = {
  card: {
    margin: '3px 0',
    padding: '4px 8px',
    borderRadius: '1px'
  }
};

const themeRender = spawnMixinRender(styles);


import 'style/page/task/card.scss';

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
    
    const crt = this.refs.main.cloneNode(true);
    this.crt = crt;
    crt.style.backgroundColor = "red";
    crt.style.position = "absolute"; crt.style.top = "0px"; crt.style.right = "0px"; crt.style.display = 'block'
    document.body.appendChild(crt);
    event.dataTransfer.setDragImage(crt, 0, 0);
    
    const width = this.refs.main.offsetWidth;
    const height = this.refs.main.offsetHeight;
    setTimeout(() => {
      this.refs.main.classList.add('moving');
    });

    return dispatch(taskCardDragLeaveStart(this.props.card, {
      offsetX: event.nativeEvent.offsetX,
      offsetY: event.nativeEvent.offsetY,
      width,
      height,
      fromListId: this.props.card.taskListId
    }));
  }
  
  onDragEnd(event) {
    document.body.removeChild(this.crt);
    this.refs.main.classList.remove('moving');
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
  
  onLoad() {
    const height = this.refs.main.offsetHeight;
    this.props.card.height = height;
    this.props.card.loaded = true;
  }

  onClick() {
    const {dispatch} = this.props;
    dispatch(setCurrentCard(this.props.card));
  }
  
  render() {
    const {card} = this.props;
    const activeRole = card.creater;
    return (
      <div className="task-card" ref='main' style={styles.card} draggable='true' onDragStart={this.onDragStart.bind(this)}
           onClick={this.onClick.bind(this)}
           onLoad={this.onLoad.bind(this)}
           onDragEnd={this.onDragEnd.bind(this)}>
        <p>{card.title}</p>
        <UserAvatar user={activeRole}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(TaskCard);
