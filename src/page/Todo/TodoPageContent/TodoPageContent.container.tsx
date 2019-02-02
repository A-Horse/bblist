import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Record } from 'immutable';
import { makeActionRequestCollection } from '../../../actions/actions';
import { TodoPageContent } from './TodoPageContent';
import { Todo } from '../../../reducers/todo.reducer';
import { RootState } from '../../../reducers';
import { Dispatch } from 'redux';

const getAllTodos = (state: RootState, props: any) => {
  const todoEntities = state.todo.get('todoEntities');
  const todoIds = state.todo.get('todoIds');
  return todoIds
    .map((id: string) => todoEntities.get(id))
    .filter((todo: any) => todo.get('todoBoxId') === props.match.params.boxId);
};

const getUnDoneTodos = createSelector(
  [getAllTodos],
  todos =>
    todos
      .filter((todo: Record<Todo>) => todo.get('status') !== 'DONE')
      .sort((a: Record<Todo>, b: Record<Todo>) => {
        return new Date(a.get('createdAt')).getTime() > new Date(b.get('createdAt')).getTime();
      })
);

const getDoneTodos = createSelector(
  [getAllTodos],
  todos =>
    todos
      .filter((todo: Record<Todo>) => todo.get('status') === 'DONE')
      .sort((a: Record<Todo>, b: Record<Todo>) => {
        return new Date(a.get('createdAt')).getTime() > new Date(b.get('createdAt')).getTime();
      })
);

const mapStateToProps = (state: RootState, props: any) => {
  return {
    unDoneTodos: getUnDoneTodos(state, props),
    doneTodos: getDoneTodos(state, props),
    todoBoxId: props.match.params.boxId
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
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
