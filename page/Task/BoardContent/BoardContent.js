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
    this.renderTrackArray = this.renderTrackArray.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
  }

  updateTaskTrackIndexs() {
    const trackIndexs = Object.values(this.trackInstanceMap).map(track =>
      track.getWrappedInstance().getTrackIdIndex()
    );
    this.props.actions.updateTaskTrackIndex(this.props.match.id, trackIndexs);
  }

  renderTrack(list, index) {
    return (
      <TaskTrack
        key={list.get('id')}
        ref={track => {
          this.trackInstanceMap[list.get('id')] = track;
        }}
        actions={this.props.actions}
        dataIndex={index}
        addTaskCard={data =>
          this.actions.ADD_TASK_CARD_REQUEST({ boardId: +this.props.board.get('id'), ...data })}
        listId={list.get('id')}
        cardIds={list.get('cards')}
        listName={list.get('name')}
        history={this.props.history}
        updateTaskTrackIndexs={this.updateTaskTrackIndexs}
        loginedUser={this.props.loginedUser}
        wallId={this.props.history.id}
      />
    );
  }

  renderTrackArray() {
    const { trackMap } = this.props;
    return trackMap.toArray().map(this.renderTrack);
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
          {this.renderTrackArray()}
          {/* <TaskTrackCreater boardId={this.props.params.id} /> */}
        </div>
        {/* {this.props.children} */}
        {/*         <CardModal key='card-modal'/> */}
      </PageContainer>
    );
  }
}

export default BoardContent;
