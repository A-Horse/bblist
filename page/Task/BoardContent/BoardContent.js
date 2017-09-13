import React, { Component } from 'react';
import R from 'ramda';
import TaskTrack from '../Track/Track';
import CardModal from '../CardModal';
import { PageContainer } from 'components/widget/PageContainer';
import { SettingIcon } from 'services/svg-icons';
import TaskTrackCreater from '../TaskTrackCreater';

import './BoardContent.scss';

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
  dimensions: {},
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
    this.updateTaskTrackIndexs = this.updateTaskTrackIndexs.bind(this);
    this.renderLists = this.renderLists.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  updateTaskTrackIndexs() {
    const trackIndexs = Object.values(this.trackInstanceMap).map(track =>
      track.getWrappedInstance().getTrackIdIndex()
    );
    this.props.actions.updateTaskTrackIndex(this.props.match.id, trackIndexs);
  }

  renderList(list, index) {
    return (
      <TaskTrack
        key={list.get('id')}
        ref={track => {
          this.trackInstanceMap[list.get('id')] = track;
        }}
        dataIndex={index}
        listId={list.get('id')}
        cardIds={list.get('cards')}
        listName={list.get('name')}
        updateTaskTrackIndexs={this.updateTaskTrackIndexs}
        wallId={this.props.history.id}
      />
    );
  }

  renderLists() {
    const { trackMap } = this.props;
    return trackMap.toArray().map(this.renderList);
  }

  renderSetttingMenu() {
    return (
      <div style={styles.settingContainer} onClick={() => {}}>
        <SettingIcon
          style={styles.settingIcon}
          onClick={() => this.setState({ boardSettingToggle: true })}
        />
      </div>
    );
  }

  render() {
    return (
      <PageContainer className="board-page-container">
        <div className="board-track-container" style={styles.listContainer}>
          {this.renderLists()}
          {/* <TaskTrackCreater boardId={this.props.params.id} /> */}
        </div>
        {/* {this.props.children} */}
        {/*         <CardModal key='card-modal'/> */}
      </PageContainer>
    );
  }
}

export default BoardContent;
