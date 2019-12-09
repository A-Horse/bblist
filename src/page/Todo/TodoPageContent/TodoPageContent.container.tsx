import { Record } from 'immutable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { createSelector } from 'reselect';

import { makeActionRequestCollection } from '../../../actions/actions';
import { RootState } from '../../../reducers';
import { Todo } from '../../../reducers/todo.reducer';
import { TodoPageContent } from './TodoPageContent';

const getAllTodos = (state: RootState, props: any) => {
  const todoEntities = state.todo.get('todoEntities');
  const todoIds = state.todo.get('todoIds');
  return todoIds
    .map((id: string) => todoEntities.get(id))
    .filter((todo: any) => todo.get('todoBoxId') === props.match.params.boxId);
};

const getUnDoneTodos = createSelector([getAllTodos], todos =>
  todos
    .filter((todo: Record<Todo>) => todo.get('status') !== 'DONE')
    .sort((a: Record<Todo>, b: Record<Todo>) => {
      return new Date(a.get('createdAt')).getTime() > new Date(b.get('createdAt')).getTime();
    })
);

const getDoneTodos = createSelector([getAllTodos], todos =>
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

export const TodoPageContentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoPageContent));
