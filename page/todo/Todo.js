import React, { Component } from 'react';
import { CheckBox } from 'components/widget/CheckBox';
import { StarCheckBox } from 'components/widget/StarCheckBox';
import DatePicker from 'components/date-picker/DatePicker';
import { getTodoList, updateTodo, destroyTodo } from 'actions/todo/todos';
import { MoreIcon, StarBorderIcon, DeleteIcon } from 'services/svg-icons';
import { IconDelete } from 'services/image-icon';
import Textarea from 'react-textarea-autosize';
import { Button } from 'components/widget/Button';
import { DropList } from 'components/widget/DropList';
import ClickOutSide from 'components/utils/ClickOutSide';
import { timeout } from 'utils/timeout';
import moment from 'moment';

import 'style/page/todo/todo.scss';

const todoMetaHeight = 24;

class Todo extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      editToggle: false,
      operationToggle: false
    };
  }

  onClick() {

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
    this.setState({editToggle: true});
    this.refs.main.style.height = 'auto';
  }

  updateEditingTodo() {
    const newTodo = {content: this.refs.content.value.trim()};
    this.setState({editToggle: false});
    this.updateTodo(newTodo);
  }

  updateTodo(newTodo) {
    const {dispatch, todo} = this.props;
    return dispatch(updateTodo(todo.id, newTodo));
  }

  onContendChanged(event) {
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();
    this.updateTodo();
  }

  destroyTodo() {
    const {todo, dispatch} = this.props;
    dispatch(destroyTodo(todo.id)).then(function() {
      // TODO
      dispatch(getTodoList());
    });
  }

  updateDone() {
    const {dispatch, todo} = this.props;
    const newTodo = {isDone: this.refs.checkbox.checked};
    this.updateTodo(newTodo);
  }

  onClickOutside() {
    if (this.state.editToggle) {
      this.closeEditable();
    }
  }

  buildRepeatSelectItems() {
    return [
      { name: 'Every Day', value: 1 },
      { name: 'Two Day', value: 2 },
      { name: 'Week', value: 7 },
    ]
  }

  render() {
    const { todo } = this.props;
    return (
      <ClickOutSide onClickOutside={::this.onClickOutside} >
        <div className='todo' ref='main' onClick={this.onClick.bind(this)}>
          <div className='todo--main'>
            <CheckBox ref='checkbox' defaultChecked={todo.isDone} onChange={this.updateDone.bind(this)}/>
            <p style={{display: !this.state.editToggle ? 'block' : 'none'}} className='todo--content' onClick={this.onContentClick.bind(this)}>{todo.content}</p>
            <Textarea ref='content' onKeyDown={this.onContendChanged.bind(this)} className='todo--content__input' style={{display: this.state.editToggle ? 'block' : 'none'}} defaultValue={todo.content}></Textarea>

            <div className="todo-deadline-label">
              <span>{new moment(todo.deadline).format('MM-DD HH:MM:SS')}</span>
            </div>

            <div className='todo-hover-operation'>
              <IconDelete onClick={::this.destroyTodo}/>
            </div>

            <StarCheckBox defaultChecked={todo.isStar} onChange={(checked) => {this.updateTodo({isStar: checked})}}/>
          </div>

          <div className='todo-editing--meta' style={{display: this.state.editToggle ? 'block' : 'none'}}>
            <div className='todo-editing--deadline'>
              <label>Deadline:</label>
              <DatePicker ref='date-picker' defaultValue={todo.deadline} onSelected={(date) => this.updateTodo({deadline: date.getTime()})}/>
            </div>

            <div className="todo-editing--repeat">
              <label>Repeat:</label>
              <Select items={this.buildRepeatSelectItems()}
                onSelect={(repeat) => this.updateTodo({repeat: repeat.value})}/>
            </div>
          </div>
        </div>
      </ClickOutSide>
    );
  }
}

export default Todo;
