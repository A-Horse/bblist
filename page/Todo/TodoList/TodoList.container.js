import R from 'ramda';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';
import Actions, { makeActionRequestCollection } from '../../../actions/actions';
import TodoList from './TodoList';

const getAllTodos = (state, props) => {
  const todoEntities = state.todos.get('todoEntities');
  const todoIds = state.todos.get('todoIds');
  console.log(todoEntities);

  return todoIds.map(id => todoEntities.get(String(id)));
};

const getTodos = createSelector([getAllTodos], R.compose(R.sort(R.prop('isDone')), R.reverse));

const mapStateToProps = (state, props) => {
  return {
    todos: getAllTodos(state, props),
    todoBoxId: state.todos.get('todoBoxId')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      makeActionRequestCollection([Actions.ADD_TODO, Actions.GET_TODOLIST, Actions.UPDATE_TODO]),
      dispatch
    )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));
