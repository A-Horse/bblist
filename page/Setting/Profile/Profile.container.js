import { connect } from 'react-redux';
import Profile from './Profile';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Actions, { makeActionRequestCollection } from '../../../actions/actions';

import { updateUserInfo } from 'actions/user';

// TODO:
const actions = {
  updateUserInfo(userId, data) {
    return dispatch => dispatch(updateUserInfo(userId, data));
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.get('loginedUser')
  };
};

const ProfileContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));

export default ProfileContainer;
