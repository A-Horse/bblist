import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addBodyEventListenerOnce} from 'actions/event/body';
import {createTodo, getTodoList} from 'actions/todo/todos';
import {AddIcon} from 'services/svg-icons';
import {Button} from 'components/widget/Button';
import DatePicker from 'components/date-picker/DatePicker';


import 'style/page/todo/todo-creater.scss';

class TodoCreater extends Component {
  
  componentWillMount() {
    this.state = {
      toggle: false
    };
  }

  createTodo() {
    const {dispatch} = this.props;
    const data = {
      content: this.refs.content.value.trim()
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

  render() {
    if (this.state.toggle) return this.renderBody();
    return this.renderToggle();
  }

  renderToggle() {
    return (
      <div onClick={this.toggle.bind(this)}>
        <AddIcon /> Add Todo
      </div>
    );
  }
  
  renderBody() {
    return (
      <div className='todo-creater-body'
           onClick={event => event.stopPropagation()}>
        <div>
          <input type='text' ref='content' />
          <DatePicker ref='date-picker' />
        </div>
        <div>
          <label>Label:</label>
          <input type='text'/>
        </div>
        <div>
          <label>Repeat:</label>
          <input type='text'/>
        </div>
        <div>
          <Button onClick={this.createTodo.bind(this)}>Add Todo</Button>
          
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
