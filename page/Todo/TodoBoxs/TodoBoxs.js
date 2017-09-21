import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'blueimp-md5';
import TodoBoxCreater from '../TodoBoxCreater/TodoBoxCreater';

import './TodoBoxs.scss';

function djb2(str) {
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return hash;
}

class TodoBoxs extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    todoBoxs: PropTypes.any
  };

  state = {};

  componentWillMount() {
    this.props.actions.GET_TODOBOXS_REQUEST();
  }

  buildIconColor(name) {
    const hash = djb2(name);
    const r = (hash & 0xff0000) >> 16;
    const g = (hash & 0x00ff00) >> 8;
    const b = hash & 0x0000ff;
    return (
      '#' +
      ('0' + r.toString(16)).substr(-2) +
      ('0' + g.toString(16)).substr(-2) +
      ('0' + b.toString(16)).substr(-2)
    );
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
                      <i
                        className="fa fa-archive"
                        style={{ color: this.buildIconColor(todoBox.get('name')) }}
                        aria-hidden="true"
                      />
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
