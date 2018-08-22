// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../../actions/actions';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

@DragDropContext(HTML5Backend)
export class ListBoard extends Component<
  {
    actions: any,
    match: any,
    history: any,
    trackMap: any,
    cardMap: any,
    board: any,
    loginedUser: any
  },
  {}
> {
  state = {};

  render() {
    return <div className="board-track-container">column</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = state => {
  return {
    board: state.task2.get('board'),
    trackMap: state.task2.get('trackMap'),
    cardMap: state.task2.get('cardMap'),
    loginedUser: state.auth.get('loginedUser')
  };
};

export const ListBoardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListBoard)
);
