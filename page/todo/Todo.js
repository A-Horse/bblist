import React, { Component } from 'react';
import { CheckBox } from 'components/widget/CheckBox';
import { StarCheckBox } from 'components/widget/StarCheckBox';
import DatePicker from 'components/date-picker/DatePicker';
import { getTodoList, updateTodo, destroyTodo } from 'actions/todo/todos';
import { IconChart } from 'services/image-icon';
import { IconDelete, IconRepeat, IconDate } from 'services/image-icon';
import Textarea from 'react-textarea-autosize';
import { Button } from 'components/widget/Button';
import { DropList } from 'components/widget/DropList';
import ClickOutSide from 'components/utils/ClickOutSide';
import { timeout } from 'utils/timeout';
import moment from 'moment';
import R from 'ramda';
import { activeTdRepeatHistory, getTodoRepeatHistory } from 'actions/todo/todo-statistics';
import { Select } from 'components/widget/Select';

import 'style/page/todo/todo.scss';

const todoMetaHeight = 24;

class Todo extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      editToggle: false
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
    this.updateTodo({content: this.refs.content.value.trim()});
  }

  destroyTodo() {
    const {todo, dispatch} = this.props;
    dispatch(destroyTodo(todo.id));
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

  onRepeatHistoryModal() {
    this.props.dispatch(activeTdRepeatHistory(this.props.todo.id));
    this.props.dispatch(getTodoRepeatHistory(this.props.todo.id));
  }

  buildRepeatSelectItems() {
    return [
      { name: 'None', value: NaN },
      { name: 'Every Day', value: 1 },
      { name: 'Two Day', value: 2 },
      { name: 'Week', value: 7 },
    ];
  }

  render() {
    const { todo } = this.props;
    return (
      <ClickOutSide onClickOutside={::this.onClickOutside} >
        <div className={`todo${this.state.editToggle ? ' open' : ''}`} ref='main' onClick={this.onClick.bind(this)}>
          <div className='todo--main'>
            <CheckBox ref='checkbox' defaultChecked={todo.isDone} onChange={this.updateDone.bind(this)}/>
            <div style={{display: !this.state.editToggle ? 'block' : 'none'}} className='todo--content' onClick={this.onContentClick.bind(this)}>
              {todo.content}
              { todo.deadline && !this.state.editToggle &&
                <div className="todo-deadline-label">
                  <span>{new moment(todo.deadline).format('MM-DD')}</span>
                </div>
              }
            </div>
            <Textarea ref='content' onKeyDown={this.onContendChanged.bind(this)} className='todo--content__input' style={{display: this.state.editToggle ? 'block' : 'none'}} defaultValue={todo.content}></Textarea>



            <div className='todo-hover-operation'>
              {
                !!todo.repeat && <IconChart onClick={::this.onRepeatHistoryModal}/>
              }

              <IconDelete onClick={::this.destroyTodo}/>
            </div>


            <StarCheckBox defaultChecked={todo.isStar} onChange={(checked) => {this.updateTodo({isStar: checked})}}/>
          </div>

          <div className='todo-editing--meta' style={{display: this.state.editToggle ? 'block' : 'none'}}>
            <div className='todo-editing--deadline'>
              <IconRepeat/>
              <label>Deadline:</label>
              <DatePicker ref='date-picker' placeholder="YYYY-MM-DD" hideIcon={true} defaultValue={todo.deadline} onSelected={(date) => this.updateTodo({deadline: date ? date.getTime() : null})}/>
            </div>

            <div className="todo-editing--repeat">
              <IconDate/>
              <label>Repeat:</label>
              <Select defaultItem={R.find(R.propEq('value', parseInt(todo.repeat, 10)))(this.buildRepeatSelectItems())}
                items={this.buildRepeatSelectItems()}
                onSelect={(repeat) => this.updateTodo({repeat: repeat.value})}/>
            </div>

          </div>
        </div>
      </ClickOutSide>
    );
  }
}

export default Todo;
