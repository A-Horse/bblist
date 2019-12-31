import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Actions, { makeActionRequestCollection } from '../../actions/actions';
import SignUp from './SignUp';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      makeActionRequestCollection([Actions.SIGNUP]),
      dispatch
    )
  };
};

const mapStateToProps = state => {
  return {
    signUpSuccess: state.auth.get('signUpSuccess')
  };
};

const SignUpContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp)
);

export default SignUpContainer;
