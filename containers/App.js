import {connect} from 'react-redux';
import App from 'components/App';
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

  };
};

const mapStateToProps = (state) => {
  return {};
};

const AppContainer = connect(
  mapStateToProps,
  wrapDispathToAction(actions, mapDispatchToProps)
)(App);

export default AppContainer;
