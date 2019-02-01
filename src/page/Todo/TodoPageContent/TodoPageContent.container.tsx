import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../actions/actions';
import { TodoPageContent } from './TodoPageContent';

const getAllTodos = (state: any, props: any) => {
  const todoEntities = state.todos.get('todoEntities');
  const todoIds = state.todos.get('todoIds');
  return todoIds
    .map((id: string) => todoEntities.get(id))
    .filter((todo: any) => todo.get('todoBoxId') === props.match.params.boxId);
};

const getUnDoneTodos = createSelector(
  [getAllTodos],
  todos =>
    todos
      .filter((todo: any) => !todo.get('isDone'))
      .sort((a: any, b: any) => {
        return a.get('created_at') > b.get('created_at');
      })
);

const getDoneTodos = createSelector(
  [getAllTodos],
  todos =>
    todos
      .filter((todo: any) => todo.get('isDone'))
      .sort((a: any, b: any) => {
        return a.get('created_at') > b.get('created_at');
      })
);

const mapStateToProps = (state: any, props: any) => {
  return {
    unDoneTodos: getUnDoneTodos(state, props),
    doneTodos: getDoneTodos(state, props),
    todoBoxId: props.match.params.boxId
  };
};

const mapDispatchToProps = (dispatch: any) => {
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
