import { connect } from 'react-redux';
import { signin } from 'actions/login';
import SignIn from 'page/SignIn';
import { browserHistory } from 'react-router';

const mapDispatchToProps = (dispatch) => {
  return {
    login(authData) {
      return dispatch(signin(authData)).then(() => {
        browserHistory.push('/home');
      });
    }
  };
};

const mapStateToProps = (state) => {
  return {
    loginErrorMessages: state.signin.errorMessage ? [state.signin.errorMessage] : []
  };
};

const SignInContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

export default SignInContainer;
