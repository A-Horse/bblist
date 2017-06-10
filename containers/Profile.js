import { connect } from 'react-redux';
import { signin } from 'actions/login';
import Profile from 'page/profile/Profile';
import { browserHistory } from 'react-router';

const mapDispatchToProps = (dispatch) => {
  return {

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
