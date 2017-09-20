import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TodoBoxCreater from '../TodoBoxCreater/TodoBoxCreater';

import './TodoBoxs.scss';

class TodoBoxs extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  state = {};

  componentWillMount() {
    this.props.actions.GET_TODOBOXS_REQUEST();
  }

  renderProjectBoxs() {}

  render() {
    // this.props.todoBoxs
    return (
      <ul className="todo-boxs">
        <div className="todo-box-creater-container">
          <TodoBoxCreater actions={this.props.actions} />
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
