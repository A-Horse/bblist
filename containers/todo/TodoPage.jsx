import { connect } from 'react-redux';
import TodoPage from 'page/todo/TodoPage';
import { wrapDispathToAction } from 'utils/wrap-props';
import { getTodoBoxs } from 'actions/todo/todos';
import R from 'ramda';

const actions = {
  getTodoBoxs
};

const mapStateToProps = (state, props) => {
  return {

  };
};

const TodoPageContainer = connect(
  mapStateToProps,
  wrapDispathToAction(actions)
)(TodoPage);

export default TodoPageContainer;
