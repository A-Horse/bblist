import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addBodyEventListenerOnce} from 'actions/event/body';
import {createTodo, getTodoList} from 'actions/todo/todos';
import {AddIcon, AlarmIcon, CloseIcon} from 'services/svg-icons';
import {Button} from 'components/widget/Button';
import DatePicker from 'components/date-picker/DatePicker';
import Popup from 'components/Popup';
import {Select} from 'components/widget/Select';
import Textarea from 'react-textarea-autosize';
import {Modal} from 'components/widget/Modal';
import Input from 'components/widget/Input';

import 'style/page/todo/todo-box-creater.scss';

class TodoBoxCreater extends Component {
  componentWillMount() {
    this.state = {toggle: false};
  }

  toggle() {
    this.setState({toggle: true});
  }

  render() {
    return (
      <div className='todo-box-creater--toggle' onClick={this.toggle.bind(this)}>
        <AddIcon className='add-icon' />
        <span className='toggle-text'>Create Todo Box</span>
      </div>
    );
  }

  close() {
    this.setState({toggle: false});
  }

  createTodoBox() {

  }

  renderCreater() {
    return (
      <Modal className='todo-box-creater' toggle={this.state.toggle} close={::this.close}>
        <CloseIcon className='clear-icon' onClick={::this.closeModal}/>

        <div className='todo-box-creater--heading'>Create Todo Box:</div>

        <Input className='todo-box-name--input' type='text' ref='name' placeholder='Board Name'/>
        <Button styleType='primary' className='taskboard-creater--create-button' onClick={::this.createTodoBox} >OK</Button>
      </Modal>
    );
  }

}

export default TodoBoxCreater;
