import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import ClickOutSide from 'components/utils/ClickOutSide';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DropList } from 'components/widget/DropList/DropList';
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
    match: PropTypes.any,
    todoBoxs: PropTypes.any
  };

  state = { smallDeviceBoxToggle: false };

  constructor(props) {
    super(props);
    this.findCurrentTodoBoxName = this.findCurrentTodoBoxName.bind(this);
  }

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

  findCurrentTodoBoxName() {
    const found = this.props.todoBoxs.find(todoBox => {
      return String(todoBox.get('id')) === this.props.match.params.boxId;
    });
    return found ? found.get('name') : 'All';
  }

  isCurrentTodoBox(todoBox) {
    if (!todoBox) {
      return !this.props.match.params.boxId;
    }
    return String(todoBox.get('id')) === this.props.match.params.boxId;
  }

  renderTodoBoxList() {
    return (
      <div className="todo-box-group-list">
        <div className="box-group">
          <div className="box-group--name">
            <li className={this.isCurrentTodoBox() ? 'active' : ''}>
              <Link to="/todo/">
                <i className="fa fa-user-circle-o" aria-hidden="true" />
                <span>My</span>
                {this.isCurrentTodoBox() && <i className="fa fa-chevron-left" aria-hidden="true" />}
              </Link>
            </li>

            {this.props.todoBoxs.map(todoBox => {
              return (
                <li
                  key={todoBox.get('id')}
                  className={this.isCurrentTodoBox(todoBox) ? 'active' : ''}
                >
                  <Link to={`/todo/${todoBox.get('id')}`}>
                    <i
                      className="fa fa-archive"
                      style={{ color: this.buildIconColor(todoBox.get('name')) }}
                      aria-hidden="true"
                    />
                    <span>{todoBox.get('name')}</span>

                    {this.isCurrentTodoBox(todoBox) && (
                      <i className="fa fa-chevron-left" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <ul className="todo-boxs">
        <MediaQuery className="nav-links__large-device" query="(min-width: 600px)">
          <div className="todo-box-creater-container">
            <TodoBoxCreater actions={this.props.actions} />
          </div>
          {this.renderTodoBoxList()}
        </MediaQuery>

        <MediaQuery className="todo-box__small-device" query="(max-width: 600px)">
          <div
            className="todo-box--current-name"
            onClick={() => {
              this.setState({ smallDeviceBoxToggle: !this.state.smallDeviceBoxToggle });
            }}
          >
            <i className="fa fa-envelope-open" aria-hidden="true" />
            <span>{this.findCurrentTodoBoxName()}</span>

            <i className="fa fa-chevron-down" aria-hidden="true" />
          </div>

          <DropList
            toggle={this.state.smallDeviceBoxToggle}
            onClick={() => this.setState({ smallDeviceBoxToggle: false })}
          >
            <ClickOutSide
              onClickOutside={event => {
                if (this.smallDeviceTodoBoxCreater.state.toggle) {
                  return;
                }
                this.setState({ smallDeviceBoxToggle: false });
              }}
            >
              <li>
                <TodoBoxCreater
                  ref={ref => (this.smallDeviceTodoBoxCreater = ref)}
                  actions={this.props.actions}
                />
              </li>
              {this.renderTodoBoxList()}
            </ClickOutSide>
          </DropList>
        </MediaQuery>
      </ul>
    );
    2;
  }
}

export default TodoBoxs;
