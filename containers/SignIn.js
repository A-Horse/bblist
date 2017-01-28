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

const mapStateToProps = (state) => {
  return {
    
  };
};

const SignInPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

export default SignInPage;
