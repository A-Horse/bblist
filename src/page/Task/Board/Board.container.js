//
import { connect } from "react-redux";
import { Board } from "./Board";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { makeActionRequestCollection } from "../../../actions/actions";

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = state => {
  return {
    board: state.task2.get("board"),
    boardParticipants: state.task2.get("boardParticipants"),
    boardFetching: state.task2.get("boardFetching"),
    boardName: state.task2.get("board")
      ? state.task2.getIn(["board", "name"])
      : "",
    trackMap: state.task2.get("trackMap"),
    cardMap: state.task2.get("cardMap"),
    loginedUser: state.auth.get("loginedUser"),
    inviteParticipant: state.user.get("inviteParticipant")
  };
};

export const BoardContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Board)
);

export default BoardContainer;
