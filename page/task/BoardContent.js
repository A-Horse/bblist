import React, { Component } from 'react';
import R from 'fw-ramda';
import TaskList from './TaskList';
import CardModal from './CardModal';
import { PageContainer } from 'components/widget/PageContainer';
import { SettingIcon } from 'services/svg-icons';
import TaskTrackCreater from './TaskTrackCreater';

import 'style/page/task/taskboard-header.scss';
import 'style/page/task/board.scss';

const styles = {
  settingIcon: {
    fill: 'white',
    verticalAlign: 'middle'
  },
  settingContainer: {
    display: 'block'
  },
  settingDropList: {
    display: 'block',
    position: 'absolute',
    top: '30px',
    left: '0',
    padding: '0',
    listStyle: 'none'
  },
  topBarTitle: {
    color: 'white'
  },
  dimensions: {

  },
  listContainer: {
    position: 'relative',
    justifyContent: 'center',
    height: '100%',
    whiteSpace: 'nowrap'
  }
};

class BoardContent extends Component {
  constructor() {
    super();
    this.state = {
      typingNewList: false,
      boardSettingToggle: false
    };

    this.trackInstanceMap = {};
  }

  updateTaskTrackIndexs() {
    const trackIndexs = Object.values(this.trackInstanceMap)
                              .map(track => track.getWrappedInstance().getTrackIdIndex());
    this.props.updateTaskTrackIndex(this.props.params.id, trackIndexs);
  }

  renderList(list, index) {
    return <TaskList
         key={list.id}
         ref={(track) => {this.trackInstanceMap[list.id] = track;}}
         dataIndex={index}
         listId={list.id}
         cardIds={list.cards}
         listName={list.name}
         updateTaskTrackIndexs={this.updateTaskTrackIndexs.bind(this)}
         wallId={this.props.params.id}>
      </TaskList>;
  }

  renderLists() {
    const {normalizedList} = this.props;
    return R.compose(R.sortBy(R.prop('index')),
                R.values)
    (normalizedList.entities).map(this.renderList.bind(this));
  }

  renderSetttingMenu() {
    return (
      <div style={styles.settingContainer} onClick={() => {}}>
        <SettingIcon style={styles.settingIcon} onClick={() => this.setState({boardSettingToggle: true})}/>
      </div>
    );
  }

  renderTopBar() {
    const {wall} = this.props;
    return (
      <div className='taskboard-header'>
        <h2 style={styles.topBarTitle}>{wall.name}</h2>
        {this.renderSetttingMenu()}
      </div>
    );
  }

  render() {
    return (
      <PageContainer className='board-page-container'>
        <div className='board-track-container' style={styles.listContainer}>
          {this.renderLists()}
          <TaskTrackCreater boardId={this.props.params.id}/>
        </div>
        {this.props.children}
        {/*         <CardModal key='card-modal'/> */}
      </PageContainer>
    );
  }
}

export default BoardContent;
