import { connect } from 'react-redux';
import Nav from 'components/Nav';
import { authUser } from 'actions/login';
import { removeCachedData } from 'utils/auth';
import { wrapDispathToAction } from 'utils/wrap-props';
import { logout } from 'actions/logout';
import { browserHistory } from 'react-router';

const actions = {};

const mapDispatchToProps = dispatch => {
  return {
    logout() {
      return dispatch(logout()).then(() => {
        browserHistory.push('/signin');
      });
    }
  };
};

const mapStateToProps = state => {
  return {
    userIsFetching: state.auth.isFetching,
    user: state.auth.loginedUser
    // path: state.router.location.pathname
  };
};

const NavContainer = connect(mapStateToProps, wrapDispathToAction(actions, mapDispatchToProps))(
  Nav
);

export default NavContainer;
