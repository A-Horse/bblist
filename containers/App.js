import { connect } from 'react-redux';
import App from 'components/App';
import { indentifyUser } from 'actions/login';
import { removeCachedData } from 'utils/auth';
import { wrapDispathToAction } from 'utils/wrap-props';
import { logout } from 'actions/logout';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Actions, { makeActionRequestCollection } from 'actions/actions';

const actions = {
  indentifyUser,
  removeCachedData // TODO
};

console.log(makeActionRequestCollection(['IDENTIFY']));

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(['IDENTIFY']), dispatch)
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
