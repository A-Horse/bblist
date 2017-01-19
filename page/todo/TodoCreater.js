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
      return dispatch(getTodoList(this.props.wallId));
    });
  }
  
  toggle(event) {
    const {dispatch} = this.props;
    this.setState({toggle: true});
    dispatch(addBodyEventListenerOnce(() => {
      this.setState({toggle: false});
    }));
    event.stopPropagation();
  }

  close() {
    const {dispatch} = this.props;
    // TODO remove close event lisenter
    this.setState({toggle: false});
  }

  render() {
    if (this.state.toggle) return this.renderBody();
    return this.renderToggle();
  }

  renderToggle() {
    return (
      <div className='todo-creater--toggle' onClick={this.toggle.bind(this)}>
        <AddIcon className='add-icon' />
        <span className='toggle-text'>Add Todo</span>
      </div>
    );
  }
  
  renderBody() {
    return (
      <div className='todo-creater-body'
           onClick={event => event.stopPropagation()}>

        <div>
          <Textarea placeholder='write your todo' className='todo-creater--content' type='text' ref='content'></Textarea>  
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
          <Button styleType='primary' onClick={this.createTodo.bind(this)}>Add Todo</Button>
          <Button className='cancel-button' styleType='default'>Cancel</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
};

export default connect(mapStateToProps)(TodoCreater);
