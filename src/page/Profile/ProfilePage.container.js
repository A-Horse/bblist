import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProfilePage from "./ProfilePage";
/* import Actions, { makeActionRequestCollection } from '../../actions/actions';
 *
 * const mapDispatchToProps = dispatch => {
 *   return {};
 * };*/

const mapStateToProps = state => {
  return {
    user: state.auth.get("loginedUser")
  };
};

const ProfileContainer = withRouter(connect(mapStateToProps)(ProfilePage));

export default ProfileContainer;
