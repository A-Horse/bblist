import { connect } from 'react-redux';
import { signin } from 'actions/login';
import SignIn from 'page/SignIn';
import { wrapDispathToAction } from 'utils/wrap-props';

const actions = {
  signin
};

const mapStateToProps = (state) => {
  return {
    loginErrorMessages: state.signin.errorMessage ? [state.signin.errorMessage] : [],
    isAuthenticated: state.signin.isAuthenticated
  };
};

const SignInContainer = connect(
  mapStateToProps,
  wrapDispathToAction(actions)
)(SignIn);

export default SignInContainer;
