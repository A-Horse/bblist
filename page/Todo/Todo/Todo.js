import React, { Component } from 'react';
import { CheckBox } from 'components/widget/CheckBox/CheckBox';
import { StarCheckBox } from 'components/widget/StarCheckBox/StarCheckBox';
import DatePicker from 'components/DatePicker/DatePicker';
import { getTodoList, updateTodo, destroyTodo } from 'actions/todo/todos';
import { IconChart } from 'services/image-icon';
import { IconDelete, IconRepeat, IconDate } from 'services/image-icon';
import Textarea from 'react-textarea-autosize';
import { Button } from 'components/widget/Button/Button';
import { DropList } from 'components/widget/DropList/DropList';
import ClickOutSide from 'components/utils/ClickOutSide';
import { timeout } from 'utils/timeout';
import moment from 'moment';
import R from 'ramda';
import { activeTdRepeatHistory, getTodoRepeatHistory } from 'actions/todo/todo-statistics';
import { Select } from 'components/widget/Select';

import './Todo.scss';

const todoMetaHeight = 24;

import { repeatItems } from '../constants';

class Todo extends Component {
  constructor() {
    super();
    this.onClickOutside = this.onClickOutside.bind(this);
    this.onRepeatHistoryModal = this.onRepeatHistoryModal.bind(this);
    this.destroyTodo = this.destroyTodo.bind(this);
    this.updateDone = this.updateDone.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  componentWillMount() {
    this.state = {
      editToggle: false
    };
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

  updateTodo(newTodo) {
    const { dispatch, todo } = this.props;
    return dispatch(updateTodo(todo.get('id'), newTodo));
  }

  onContendChanged(event) {
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();
    this.updateTodo({ content: this.refs.content.value.trim() });
  }

  destroyTodo() {
    const { todo, dispatch } = this.props;
    dispatch(destroyTodo(todo.id));
  }

  updateDone(checked) {
    this.updateTodo({ isDone: checked });
  }

  onClickOutside() {
    if (this.state.editToggle) {
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
                !this.state.editToggle &&
                <div className="todo-deadline-label">
                  <span>
                    {new moment(todo.get('deadline')).format('MM-DD')}
                  </span>
                </div>}
            </div>
            <Textarea
              ref="content"
              onKeyDown={this.onContendChanged.bind(this)}
              className="todo--content__input"
              style={{ display: this.state.editToggle ? 'block' : 'none' }}
              defaultValue={todo.get('content')}
            />

            <div className="todo-hover-operation">
              {!!todo.get('repeat') && <IconChart onClick={this.onRepeatHistoryModal} />}

              <IconDelete onClick={this.destroyTodo} />
            </div>

            <StarCheckBox
              defaultChecked={todo.get('isStar')}
              onChange={checked => {
                this.updateTodo({ isStar: checked });
              }}
            />
          </div>

          {this.state.editToggle &&
            <div
              className="todo-editing--meta"
              style={{ display: this.state.editToggle ? 'block' : 'none' }}
            >
              <div className="todo-editing--deadline">
                <IconRepeat />
                <label>Deadline:</label>
                <DatePicker
                  ref="date-picker"
                  placeholder="YYYY-MM-DD"
                  hideIcon={true}
                  defaultValue={todo.deadline}
                  onSelected={date => this.updateTodo({ deadline: date ? date.getTime() : null })}
                />
              </div>

              <div className="todo-editing--repeat">
                <IconDate />
                <label>Repeat:</label>
                <Select
                  defaultItem={R.find(R.propEq('value', parseInt(todo.repeat, 10)))(repeatItems)}
                  items={repeatItems}
                  onSelect={repeat => this.updateTodo({ repeat: repeat.value })}
                />
              </div>
            </div>}
        </div>
      </ClickOutSide>
    );
  }
}

export default Todo;
