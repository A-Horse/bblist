import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from './App';

const mapDispatchToProps = dispatch => {
  return {
    actions: {}
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.get('loginedUser')
  };
};

const AppContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);

export default AppContainer;
