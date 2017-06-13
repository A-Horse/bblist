import { connect } from 'react-redux';
import Profile from 'page/setting/Profile';
import { bindActionCreators } from 'redux';

import { updatePassword } from 'actions/user';

const actions = {

};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.loginedUser
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfileContainer;
