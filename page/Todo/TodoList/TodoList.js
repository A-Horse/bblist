import React, { Component } from 'react';

import TodoCreater from '../TodoCreater/TodoCreater';
import Todo from '../Todo/Todo';

import './TodoList.scss';

export default class TodoList extends Component {
  state = { toggleAll: false };

  componentWillMount() {
    const { todoBoxId } = this.props;
    this.props.actions.GET_TODOLIST_REQUEST({ todoBoxId });
  }

  renderList(todos) {
    return todos.map(todo => (
      <Todo key={todo.get('id')} todo={todo} actions={this.props.actions} />
    ));
  }

  render() {
    return (
      <div className="todo-list">
        <div className="creater-container">
          <TodoCreater actions={this.props.actions} />
        </div>

        <div className="todos">
          <div className="undone">{this.renderList(this.props.unDoneTodos)}</div>
          <div>
            <span onClick={() => this.setState({ toggleAll: !this.state.toggleAll })}>
              {!this.state.toggleAll ? 'show all' : 'hide done'}
            </span>
          </div>
          {this.state.toggleAll && (
            <div className="done">{this.renderList(this.props.doneTodos)}</div>
          )}
        </div>
      </div>
    );
  }
}
