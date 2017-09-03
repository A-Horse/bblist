import React, { Component } from 'react';
import { PageContainer } from 'components/widget/PageContainer';
import { connect } from 'react-redux';
import TodoCreater from './TodoCreater';
import Todo from './Todo/Todo';
import { createSelector } from 'reselect';
import R from 'ramda';
import { toJS } from '../../utils/immutable-to-js';
import { withRouter } from 'react-router-dom';

import { createTodo, getTodoList } from 'actions/todo/todos';
import 'style/page/todo/todo-list.scss';

class TodoList extends Component {
  componentWillMount() {
    const { dispatch, todoBoxId } = this.props;
    dispatch(getTodoList({ todoBoxId }));
  }

  componentDidUpdate() {}

  renderList() {
    const { todos } = this.props;
    return todos.map(todo => {
      return <Todo key={todo.get('id')} todo={todo} dispatch={this.props.dispatch} />;
    });
  }

  render() {
    console.log('ttttttt', this.props.todos);

    return (
      <div className="todo-list">
        <TodoCreater />
        <div className="todos">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

const getAllTodos = (state, props) => {
  console.log(state.todos);

  const todoEntities = state.todos.get('todoEntities');
  const todoIds = state.todos.get('todoIds');
  // console.log(todoEntities, todoIds);
  // console.log(todoIds.map(id => todoEntities[id]));
  // console.log(todoIds.map(id => todoEntities.get(id)));

  return todoIds.map(id => todoEntities.get(String(id)));
  /* const todoResults = R.path(['TodoBox', state.todos.todoBoxId, 'todos'], entities) || [];
   * return todoResults.map(id => entities.Todo[id]);*/
};
const getTodos = createSelector([getAllTodos], R.compose(R.sort(R.prop('isDone')), R.reverse));

const mapStateToProps = (state, props) => {
  return {
    todos: getAllTodos(state, props),
    todoBoxId: state.todos.todoBoxId
  };
};

export default withRouter(connect(mapStateToProps)(TodoList));
