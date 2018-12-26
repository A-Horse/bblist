//
import React, { Component } from "react";
import { ColumnBoardContainer } from "./ColumnBoard/ColumnBoard";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { makeActionRequestCollection } from "../../../actions/actions";
import { ListBoardContainer } from "./ListBoard/ListBoard";
import { Map } from "immutable";

import "./BoardContent.less";

export class BoardContent extends Component {
  state = {};

  render() {
    const isListView = this.props.boardSetting.get("showType") === "LIST";
    return (
      <div className="board-content-container">
        {isListView ? <ListBoardContainer /> : <ColumnBoardContainer />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = (state, props) => {
  const taskBoardId = props.match.params.boardId;
  return {
    taskBoardId,
    boardSetting: state.task2.get("boardSettingMap").get(taskBoardId) || Map(),
    loginedUser: state.auth.get("loginedUser")
  };
};

export const BoardContentContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BoardContent)
);
