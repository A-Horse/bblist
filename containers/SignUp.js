import {connect} from 'react-redux';
import {signUp} from '../actions/sign-up';
import SignUp from 'page/SignUp';

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (signUpData) => {
      return dispatch(signUp(signUpData));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    
  };
};

const SignUpPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

export default SignUpPage;
