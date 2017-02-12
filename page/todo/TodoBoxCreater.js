import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addBodyEventListenerOnce} from 'actions/event/body';
import {createTodo, getTodoList} from 'actions/todo/todos';
import {AddIcon, AlarmIcon, FlagIcon} from 'services/svg-icons';
import {Button} from 'components/widget/Button';
import DatePicker from 'components/date-picker/DatePicker';
import Popup from 'components/Popup';
import {Select} from 'components/widget/Select';
import Textarea from 'react-textarea-autosize';

import 'style/page/todo/todo-box-creater.scss';

class TodoBoxCreater extends Component {
  componentWillMount() {
    this.state = {toggle: false};
  }
  
  toggle() {
    this.setState({toggle: true});
  }

  render() {
    if (this.state.toggle) return this.renderCreater();
    return this.renderToggle();
  }

  renderToggle() {
    return (
      <div className='todo-box-creater--toggle' onClick={this.toggle.bind(this)}>
        <AddIcon className='add-icon' />
        <span className='toggle-text'>Create Todo Box</span>
      </div>
    );
  }

  renderCreater() {
    
  }

}

export default TodoBoxCreater;
