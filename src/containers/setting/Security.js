import { connect } from 'react-redux';
import Security from 'page/setting/Security';
import { bindActionCreators } from 'redux';

import { updatePassword } from 'actions/user';

const actions = {
  updatePassword(data) {
    return dispatch => dispatch(updatePassword(data));
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

const mapStateToProps = state => {
  return {};
};

const SecurityContainer = connect(mapStateToProps, mapDispatchToProps)(Security);

export default SecurityContainer;
