import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import TodoBoxCreater from '../TodoBoxCreater/TodoBoxCreater';

import './TodoBoxs.scss';

class TodoBoxs extends Component {
  state = {};

  componentWillMount() {
    // this.props.actions.getTodoBoxs();
  }

  renderProjectBoxs() {}

  render() {
    // this.props.todoBoxs
    return (
      <ul className="todo-boxs">
        <div className="todo-box-creater-container">
          <TodoBoxCreater />
        </div>

        <div className="todo-box-group-list">
          <div className="box-group">
            <div className="box-group--name all-todo-filter">
              <Link to="/todo/">
                <span>All</span>
              </Link>
            </div>
          </div>
        </div>
      </ul>
    );
  }
}

export default TodoBoxs;
