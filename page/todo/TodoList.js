import React, { Component } from 'react';
import { PageContainer } from 'components/widget/PageContainer';
import { connect } from 'react-redux';
import TodoCreater from './TodoCreater';
import Todo from './Todo';
import { createSelector } from 'reselect';
import R from 'ramda';

import { createTodo, getTodoList } from 'actions/todo/todos';
import 'style/page/todo/todo-list.scss';

class TodoList extends Component {
  componentWillMount() {
    const { dispatch, todoBoxId } = this.props;
    dispatch(getTodoList({todoBoxId}));
  }

  componentDidUpdate() {

  }

  renderList() {
    const { todos } = this.props;
    return todos.map(todo => {
      return <Todo key={todo.id} todo={todo} dispatch={this.props.dispatch} />;
    });
  }

  render() {
    return (
      <div className='todo-list'>
        <TodoCreater />
        <div className="todos">
        { this.renderList() }
        </div>

      </div>
    );
  }
}

const getAllTodos = (state, props) => {
  const { entities } = state.todos;
  const todoResults = R.path(
    ['TodoBox',
     state.todos.todoBoxId,
     'todos'
    ], entities) || [];
  return todoResults.map(id => entities.Todo[id]);
};
const getTodos = createSelector([getAllTodos], R.compose(R.sort(R.prop('isDone')), R.reverse));

const mapStateToProps = (state, props) => {
  return {
    todos: getTodos(state, props),
    todoBoxId: state.todos.todoBoxId
  };
};

export default connect(mapStateToProps)(TodoList);
