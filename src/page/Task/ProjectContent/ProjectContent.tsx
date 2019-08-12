import './ProjectContent.scss';

import { Map } from 'immutable';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { makeActionRequestCollection } from '../../../actions/actions';
import { BoardSideBar } from '../../Project/ProjectPage/BoardSideBar/BoardSideBar';
import { ColumnBoardContainer } from './ColumnBoard/ColumnBoard';

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

export const ProjectContentContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectContent)
);
