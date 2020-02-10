import { connect } from 'react-redux';
import Profile from './Profile';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Actions, { makeActionRequestCollection } from '../../../actions/actions';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      makeActionRequestCollection([Actions.UPDATE_USER]),
      dispatch
    )
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.get('loginedUser')
  };
};

const ProfileContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);

export default ProfileContainer;
