import { connect } from 'react-redux';
import WikiPage from 'page/wiki/WikiPage';
import { wrapDispathToAction } from 'utils/wrap-props';
import R from 'ramda';

const actions = {

};

const mapStateToProps = (state, props) => {
  return {};
};

const WikiPageContainer = connect(
  mapStateToProps,
  wrapDispathToAction(actions)
)(WikiPage);

export default WikiPageContainer;
