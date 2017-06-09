import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addBodyEventListenerOnce} from 'actions/event/body';
import {createTodo, getTodoList} from 'actions/todo/todos';
import {IconAdd} from 'services/image-icon';
import {Button} from 'components/widget/Button';
import DatePicker from 'components/date-picker/DatePicker';
import Popup from 'components/Popup';
import {Select} from 'components/widget/Select';
import Textarea from 'react-textarea-autosize';
import {isEnterKey} from 'utils/keyboard';

import ClickOutSide from 'components/utils/ClickOutSide';

import 'style/page/todo/todo-creater.scss';

import {repeatItems} from './constants';

class TodoCreater extends Component {
  componentWillMount() {
    this.state = {
      toggle: false
    };
  }

  createTodo() {
    const {dispatch} = this.props;
    const data = {
      content: this.refs.content.value.trim(),
      deadline: this.refs.datePicker.value ? this.refs.datePicker.value.getTime() : null
      //label: this.refs.label.trim().split(';')
    };
    return dispatch(createTodo(data)).then(() => {
      this.close();
      return dispatch(getTodoList(this.props.wallId));
    });
  }

  toggle() {
    this.setState({toggle: true});
  }

  close() {
    this.setState({toggle: false});
  }

  onInputKeyDown(event) {
    if (isEnterKey(event)) {
      event.preventDefault();
      this.createTodo();
    }
  }

  render() {
    if (this.state.toggle) return this.renderCreater();
    return this.renderToggle();
  }

  renderToggle() {
    return (
      <div className='todo-creater--toggle' onClick={::this.toggle}>
        <IconAdd className='add-icon'/>
        <span className='toggle-text'>Add Todo</span>
      </div>
    );
  }

  renderCreater() {
    return (
      <ClickOutSide onClickOutside={::this.close}>
        <div className='todo-creater-body'>

          <div className='todo-creater--input'>
            <Textarea onKeyDown={::this.onInputKeyDown} placeholder='write your todo' className='todo-creater--content' type='text' ref='content'></Textarea>
          </div>

          <div className='todo-creater-deadline'>
            <label>Deadline:</label>
            <DatePicker ref='datePicker' arrow='auto'/>
          </div>

          <div className='repeat-input hidden'>
            <label>Repeat:</label>
            <Select items={repeatItems}/>
          </div>

          <div className='todo-creater--label hidden'>
            <Textarea type='text' placeholder='Label' ref='label'></Textarea>
          </div>

          <div className='todo-creater-operation'>
            <Button styleType='primary' onClick={::this.createTodo}>Create Todo</Button>
            <Button className='cancel-button' styleType='default' onClick={::this.close}>Cancel</Button>
          </div>
        </div>
      </ClickOutSide>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(TodoCreater);
