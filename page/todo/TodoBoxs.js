import React, { Component } from 'react';
import { PageContainer } from 'components/widget/PageContainer';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { makeGravatarUrl } from 'services/gravatar';
import TodoList from './TodoList/TodoList';
import { createTodo, getTodoList } from 'actions/todo/todos';
import { updateTitle } from 'services/title';
import { Link } from 'react-router-dom';
import { ReorderIcon, FormatListIcon, UnarchinveIcon } from 'services/svg-icons';
import TodoBoxCreater from './TodoBoxCreater/TodoBoxCreater';

import 'style/page/todo/todo-boxs.scss';

class TodoBoxs extends Component {
  componentWillMount() {
    this.state = {};
    this.props.actions.getTodoBoxs();
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
                <FormatListIcon />
                <span>All</span>
              </Link>
            </div>
          </div>

          <div className="box-group">
            <div className="box-group--name default-todo-filter">
              <Link to="/todo/">
                <ReorderIcon />
                <span>Default</span>
              </Link>
            </div>
          </div>

          <div className="box-group board-group">
            <div className="box-group--name">
              <UnarchinveIcon />
              <span>Board</span>
            </div>
            {this.renderProjectBoxs}
          </div>
        </div>
      </ul>
    );
  }
}

export default TodoBoxs;
