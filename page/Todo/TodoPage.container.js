import { connect } from 'react-redux';
import TodoPage from 'page/Todo/TodoPage';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Actions, { makeActionRequestCollection } from '../../actions/actions';

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection([Actions.GET_TODOBOXS]), dispatch)
  };
};

const TodoPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoPage));

export default TodoPageContainer;
