import React, { Component } from 'react';

import { getTodoList } from 'actions/todo/todos';
import TodoCreater from '../TodoCreater/TodoCreater';
import Todo from '../Todo/Todo';

import './TodoList.scss';

export default class TodoList extends Component {
  componentWillMount() {
    const { todoBoxId } = this.props;
    this.props.actions.GET_TODOLIST_FN({ todoBoxId });
  }

  renderList(todos) {
    return todos.map(todo =>
      <Todo key={todo.get('id')} todo={todo} actions={this.props.actions} />
    );
  }

  render() {
    return (
      <div className="todo-list">
        <div className="creater-container">
          <TodoCreater actions={this.props.actions} />
        </div>

        <div className="todos">
          <div className="undone">
            {this.renderList(this.props.unDoneTodos)}
          </div>
          <div className="done">
            {this.renderList(this.props.doneTodos)}
          </div>
        </div>
      </div>
    );
  }
}
