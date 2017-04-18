import {connect} from 'react-redux';
import Nav from 'components/Nav';
import {authUser} from 'actions/login';
import {removeCachedData} from 'utils/auth';
import {wrapDispathToAction} from 'utils/wrap-props';
import {logout} from 'actions/logout';
import {browserHistory} from 'react-router';

const actions = {
  authUser,
  removeCachedData
};

const mapDispatchToProps = (dispatch) => {
  return {
    // TODO logout staus error
    logout() {
      return dispatch(logout()).then(() => {
        removeCachedData();
        browserHistory.push('/');
      });
    }
  };
};

const mapStateToProps = (state) => {
  return {
    userIsFetching: state.auth.isFetching,
    user: state.auth.loginedUser,
    path: state.routing.locationBeforeTransitions.pathname
  };
};

const NavContainer = connect(
  mapStateToProps,
  wrapDispathToAction(actions, mapDispatchToProps)
)(Nav);

export default NavContainer;
