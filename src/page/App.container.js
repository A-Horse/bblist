import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../actions/actions';
import App from './App';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.get('loginedUser')
  };
};

const AppContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

export default AppContainer;
