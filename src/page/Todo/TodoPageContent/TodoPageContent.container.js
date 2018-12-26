//
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../actions/actions';
import { TodoPageContent } from './TodoPageContent';

const getAllTodos = (state, props) => {
  const todoEntities = state.todos.get('todoEntities');
  const todoIds = state.todos.get('todoIds');
  return todoIds
    .map(id => todoEntities.get(String(id)))
    .filter(todo => todo.get('todoBoxId') === props.match.params.boxId);
};

const getUnDoneTodos = createSelector(
  [getAllTodos],
  todos =>
    todos
      .filter(todo => !todo.get('isDone'))
      .sort((a, b) => {
        return a.get('created_at') > b.get('created_at');
      })
);

const getDoneTodos = createSelector(
  [getAllTodos],
  todos =>
    todos
      .filter(todo => todo.get('isDone'))
      .sort((a, b) => {
        return a.get('created_at') > b.get('created_at');
      })
);

const mapStateToProps = (state, props) => {
  return {
    unDoneTodos: getUnDoneTodos(state, props),
    doneTodos: getDoneTodos(state, props),
    todoBoxId: props.match.params.boxId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

export const TodoPageContentContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoPageContent)
);
