import {connect} from 'react-redux';
import {signin} from 'actions/login';
import SignIn from 'page/SignIn';

const mapDispatchToProps = (dispatch) => {
  return {
    login(authData) {
      return dispatch(signin(authData));
    }
  };
};

const SignInPage = connect(
  null,
  mapDispatchToProps
)(SignIn);

export default SignInPage;
