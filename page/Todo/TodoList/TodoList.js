import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import R from 'ramda';
import { withRouter } from 'react-router-dom';
import { getTodoList } from 'actions/todo/todos';

import TodoCreater from '../TodoCreater/TodoCreater';
import Todo from '../Todo/Todo';
import DatePicker from 'components/DatePicker/DatePicker';

import './TodoList.scss';

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
    return (
      <div className="todo-list">
        <DatePicker ref="datePicker" />
        <div className="creater-container">
          <TodoCreater />
        </div>

        <div className="todos">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

const getAllTodos = (state, props) => {
  const todoEntities = state.todos.get('todoEntities');
  const todoIds = state.todos.get('todoIds');

  return todoIds.map(id => todoEntities.get(String(id)));
};

const getTodos = createSelector([getAllTodos], R.compose(R.sort(R.prop('isDone')), R.reverse));

const mapStateToProps = (state, props) => {
  return {
    todos: getAllTodos(state, props),
    todoBoxId: state.todos.todoBoxId
  };
};

export default withRouter(connect(mapStateToProps)(TodoList));
