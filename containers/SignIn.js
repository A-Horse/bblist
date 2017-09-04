import { connect } from 'react-redux';
import { signin } from 'actions/login';
import SignIn from 'page/SignIn';
import { wrapDispathToAction } from 'utils/wrap-props';
import { withRouter } from 'react-router-dom';
import Actions, { makeActionRequestCollection } from 'actions/actions';

const actions = {
  signin
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(['LOGIN']), dispatch)
  };
};

const mapStateToProps = state => {
  return {
    loginErrorMessages: state.signin.errorMessage ? [state.signin.errorMessage] : [],
    isAuthenticated: state.signin.isAuthenticated
  };
};

export const SignInContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));

export default SignInContainer;
