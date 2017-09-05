import { connect } from 'react-redux';
import { signin } from 'actions/login';
import SignIn from 'page/SignIn';
import { wrapDispathToAction } from 'utils/wrap-props';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Actions, { makeActionRequestCollection } from 'actions/actions';

/* const actions = {
 *   signin
 * };*/

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      makeActionRequestCollection(Actions.LOGIN, Actions.LOGIN_FINISH),
      dispatch
    )
  };
};

const mapStateToProps = state => {
  return {
    signInErrorMessages: state.auth.get('signInErrorMessage'),
    signInAuthenticated: state.auth.get('signInAuthenticated')
  };
};

export const SignInContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));

export default SignInContainer;
