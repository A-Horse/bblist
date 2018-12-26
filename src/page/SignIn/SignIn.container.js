import { connect } from "react-redux";
import SignIn from "./SignIn";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Actions, { makeActionRequestCollection } from "../../actions/actions";

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      makeActionRequestCollection([Actions.LOGIN]),
      dispatch
    )
  };
};

const mapStateToProps = state => {
  return {
    signInErrorMessages: state.auth.get("signInErrorMessage"),
    signInAuthenticated: state.auth.get("signInAuthenticated")
  };
};

export const SignInContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn)
);

export default SignInContainer;
