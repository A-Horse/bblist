import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoCreater from '../TodoCreater/TodoCreater';
import Todo from '../Todo/Todo';

import './TodoList.scss';

export default class TodoList extends Component {
  static propTypes = {
    todoBoxId: PropTypes.any,
    actions: PropTypes.object.isRequired,
    unDoneTodos: PropTypes.any.isRequired,
    doneTodos: PropTypes.any.isRequired
  };

  state = { toggleAll: false };

  componentWillMount() {
    this.getTodoList(this.props, true);
  }

  componentWillReceiveProps(newProps) {
    this.getTodoList(newProps);
  }

  getTodoList(props, force) {
    const { todoBoxId } = props;
    if (force || todoBoxId !== this.props.todoBoxId) {
      this.props.actions.GET_TODOLIST_REQUEST({ todoBoxId });
    }
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
            <span
              className="remain-todo-toggle"
              onClick={() => this.setState({ toggleAll: !this.state.toggleAll })}
            >
              <i className="fa fa-check-circle" aria-hidden="true" />
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
