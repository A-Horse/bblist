import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'blueimp-md5';
import TodoBoxCreater from '../TodoBoxCreater/TodoBoxCreater';

import './TodoBoxs.scss';

class TodoBoxs extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    todoBoxs: PropTypes.any
  };

  state = {};

  componentWillMount() {
    this.props.actions.GET_TODOBOXS_REQUEST();
  }

  render() {
    return (
      <ul className="todo-boxs">
        <div className="todo-box-creater-container">
          <TodoBoxCreater actions={this.props.actions} />
        </div>

        <div className="todo-box-group-list">
          <div className="box-group">
            <div className="box-group--name all-todo-filter">
              <div>
                <Link to="/todo/">
                  <span>All</span>
                </Link>
              </div>

              {this.props.todoBoxs.map(todoBox => {
                return (
                  <div key={todoBox.get('id')}>
                    <Link to={`/todo/${todoBox.get('id')}`}>
                      <span>{todoBox.get('name')}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ul>
    );
  }
}

export default TodoBoxs;
