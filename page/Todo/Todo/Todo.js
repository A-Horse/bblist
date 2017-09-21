import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'components/widget/CheckBox/CheckBox';
import { StarCheckBox } from 'components/widget/StarCheckBox/StarCheckBox';
import DatePicker from 'components/DatePicker/DatePicker';
import Textarea from 'react-textarea-autosize';
import ClickOutSide from 'components/utils/ClickOutSide';
import { timeout } from 'utils/timeout';
import moment from 'moment';
import R from 'ramda';
import ConfirmModalButton from '../../../components/ConfrimModalButton/ConfirmModalButton';
import { activeTdRepeatHistory, getTodoRepeatHistory } from 'actions/todo/todo-statistics';
import { Select } from 'components/widget/Select';

import './Todo.scss';

const todoMetaHeight = 24;

import { repeatItems } from '../constants';

class Todo extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    todo: PropTypes.object
  };

  state = {
    editToggle: false
  };

  constructor(props) {
    super(props);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.onRepeatHistoryModal = this.onRepeatHistoryModal.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.updateDone = this.updateDone.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.onContendChanged = this.onContendChanged.bind(this);
  }

  async closeEditable() {
    const currentTodoHeight = this.refs.main.offsetHeight;
    this.refs.main.style.height = currentTodoHeight + 'px';
    await timeout();
    this.refs.main.style.height = currentTodoHeight - todoMetaHeight + 'px';
    this.setState({ editToggle: false });
    await timeout(300);
    this.refs.main.style.height = 'auto';
  }

  async onContentClick() {
    const currentTodoHeight = this.refs.main.offsetHeight;
    this.refs.main.style.height = currentTodoHeight + 'px';
    await timeout();
    this.refs.main.style.height = currentTodoHeight + todoMetaHeight + 'px';
    await timeout(300);
    this.setState({ editToggle: true });
    this.refs.main.style.height = 'auto';
  }

  updateEditingTodo() {
    const newTodo = { content: this.refs.content.value.trim() };
    this.setState({ editToggle: false });
    this.updateTodo(newTodo);
  }

  updateTodo(toPatchData) {
    const { todo } = this.props;
    const data = {
      id: todo.get('id'),
      ...toPatchData
    };
    this.props.actions.UPDATE_TODO_REQUEST(data);
  }

  onContendChanged(event) {
    event.preventDefault();
    this.updateTodo({ content: event.target.value.trim() });
  }

  removeTodo() {
    const { todo } = this.props;
    this.props.actions.DESTORY_TODO_REQUEST({
      id: todo.get('id')
    });
  }

  updateDone(checked) {
    this.updateTodo({ isDone: checked });
  }

  onClickOutside() {
    if (this.state.editToggle) {
      if (this.refs.datePicker.state.toggle) {
        return;
      }
      this.closeEditable();
    }
  }

  onRepeatHistoryModal() {
    this.props.dispatch(activeTdRepeatHistory(this.props.todo.id));
    this.props.dispatch(getTodoRepeatHistory(this.props.todo.id));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.todo !== nextProps.todo) {
      return true;
    }
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }

  render() {
    const { todo } = this.props;

    return (
      <ClickOutSide onClickOutside={this.onClickOutside}>
        <div
          className={`todo${this.state.editToggle ? ' open' : ''}${todo.isDone ? ' done' : ''}`}
          ref="main"
        >
          <div className="todo--main">
            <CheckBox
              ref="checkbox"
              defaultChecked={todo.get('isDone')}
              onChange={this.updateDone}
            />
            <div
              style={{ display: !this.state.editToggle ? 'block' : 'none' }}
              className="todo--content"
              onClick={this.onContentClick.bind(this)}
            >
              {todo.get('content')}
              {todo.get('deadline') &&
                !this.state.editToggle && (
                  <div className="todo-deadline-label">
                    <span>{new moment(todo.get('deadline')).format('MM-DD')}</span>
                  </div>
                )}
            </div>
            <Textarea
              ref="content"
              className="todo--content__input"
              style={{ display: this.state.editToggle ? 'block' : 'none' }}
              defaultValue={todo.get('content')}
              onChange={this.onContendChanged}
            />

            <div className="todo-hover-operation">
              <ConfirmModalButton onConfirm={this.removeTodo}>
                <i className="fa fa-trash" aria-hidden="true" />
              </ConfirmModalButton>
              {!!todo.get('repeat') && (
                <i
                  className="fa fa-bar-chart"
                  onClick={this.onRepeatHistoryModal}
                  aria-hidden="true"
                />
              )}
              <StarCheckBox
                defaultChecked={todo.get('isStar')}
                onChange={checked => {
                  this.updateTodo({ isStar: checked });
                }}
              />
            </div>
          </div>
          {this.state.editToggle && (
            <div
              className="todo-editing--meta"
              style={{ display: this.state.editToggle ? 'block' : 'none' }}
            >
              <div className="todo-editing-field todo-editing--deadline">
                <i className="fa fa-calendar-check-o" aria-hidden="true" />
                <label>Deadline:</label>
                <DatePicker
                  ref="datePicker"
                  placeholder="YYYY-MM-DD"
                  hideIcon={true}
                  defaultValue={todo.get('deadline')}
                  onSelected={date => this.updateTodo({ deadline: date ? date.getTime() : null })}
                />
              </div>

              <div className="todo-editing-field todo-editing--repeat">
                <i className="fa fa-repeat" aria-hidden="true" />
                <label>Repeat:</label>
                <Select
                  defaultItem={R.find(R.propEq('value', parseInt(todo.get('repeat'), 10)))(
                    repeatItems
                  )}
                  items={repeatItems}
                  onSelect={repeat => this.updateTodo({ repeat: repeat.value })}
                />
              </div>
            </div>
          )}
        </div>
      </ClickOutSide>
    );
  }
}

export default Todo;
