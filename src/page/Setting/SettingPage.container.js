import { connect } from "react-redux";
import SettingPage from "page/Setting/SettingPage";
import { withRouter } from "react-router-dom";

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {};
};

const SettingPageContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SettingPage)
);

export default SettingPageContainer;
