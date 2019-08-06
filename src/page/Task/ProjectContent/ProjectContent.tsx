import React, { Component } from 'react';
import { ColumnBoardContainer } from './ColumnBoard/ColumnBoard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../actions/actions';
import { Map } from 'immutable';

import './ProjectContent.scss';
import { BoardSideBar } from './ColumnBoard/BoardSideBar/BoardSideBar';

export class ProjectContent extends Component {
  state = {};

  render() {
    return (
      <div>
        <BoardSideBar />
        <ColumnBoardContainer />
      </div>
      
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = (state: any, props: any) => {
  const taskBoardId = props.match.params.boardId;
  return {
    taskBoardId,
    boardSetting: state.task2.get('boardSettingMap').get(taskBoardId) || Map(),
    loginedUser: state.auth.get('loginedUser')
  };
};

export const BoardContentContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectContent)
);
