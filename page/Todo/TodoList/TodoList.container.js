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
  return todoIds.map(id => todoEntities.get(String(id)));
};

function sort(a, b) {
  return a.get('created_at') > b.get('created_at');
}

const getUnDoneTodos = createSelector([getAllTodos], todos =>
  todos.filter(todo => !todo.get('isDone')).sort((a, b) => {
    return a.get('created_at') > b.get('created_at');
  })
);

const getDoneTodos = createSelector([getAllTodos], todos =>
  todos.filter(todo => todo.get('isDone')).sort((a, b) => {
    return a.get('created_at') > b.get('created_at');
  })
);

const mapStateToProps = (state, props) => {
  return {
    unDoneTodos: getUnDoneTodos(state, props),
    doneTodos: getDoneTodos(state, props),
    todoBoxId: state.todos.get('todoBoxId')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      makeActionRequestCollection([
        Actions.ADD_TODO,
        Actions.GET_TODOLIST,
        Actions.UPDATE_TODO,
        Actions.DESTORY_TODO
      ]),
      dispatch
    )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));
