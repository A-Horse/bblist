//
import { connect } from "react-redux";
import { CardDetail } from "./CardDetail";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { makeActionRequestCollection } from "../../../actions/actions";
import epicAdapterService from "../../../services/single/epic-adapter.service";

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch),
    epicAdapterService
  };
};

const mapStateToProps = (state, props) => {
  return {
    board: state.task2.get("board"),
    trackMap: state.task2.get("trackMap"),
    card: state.task2.get("cardMap").get(String(props.match.params.cardId))
    /* loginedUser: state.auth.get('loginedUser') */
  };
};

export const CardDetailContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CardDetail)
);
