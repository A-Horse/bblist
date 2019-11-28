import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SettingPage from '../../page/Setting/SettingPage';

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

const mapStateToProps = (state: any) => {
  return {};
};

const SettingPageContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SettingPage)
);

export default SettingPageContainer;
