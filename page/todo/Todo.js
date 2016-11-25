import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CheckBox} from 'components/widget/CheckBox';
import DatePicker from 'components/date-picker/DatePicker';
import {getTodoList, updateTodo} from 'actions/todo/todos';
import {MoreIcon} from 'services/svg-icons';
import Textarea from 'react-textarea-autosize';
import {Button} from 'components/widget/Button';

import 'style/page/todo/todo.scss';

class Todo extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      editToggle: false
    };
  }

  onDragStart(event) {
    
  }
  
  onDragEnd(event) {
    
  }
  
  finishTodo() {
    
  }
  

  onClick() {
    
  }

  onContentClick() {
    this.setState({editToggle: true});
  }

  editDone(event) {
    // TODO extract services
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();
    const {dispatch, todo} = this.props;
    const newTodo = {content: this.refs.content.value.trim()};
    this.setState({editToggle: false});
    dispatch(updateTodo(todo.id, newTodo)).then(getTodoList);
  }
    
  render() {
    const {todo} = this.props;
    return (
      <div className='todo' ref='main' draggable='true' onDragStart={this.onDragStart.bind(this)}
           onClick={this.onClick.bind(this)}
           onDragEnd={this.onDragEnd.bind(this)}>

        <div className='todo--main'>
          <CheckBox ref='checkbox'/>
          <p style={{display: !this.state.editToggle ? 'block' : 'none'}} className='todo--content' onClick={this.onContentClick.bind(this)}>{todo.content}</p>
          <Textarea ref='content' onKeyDown={this.editDone.bind(this)} className='todo--content__input' style={{display: this.state.editToggle ? 'block' : 'none'}} defaultValue={todo.content}></Textarea>

          <div>
            <MoreIcon className='more-icon'/>
          </div>
        </div>

        <div className='todo-editing--meta' style={{display: this.state.editToggle ? 'block' : 'none'}}>
          <div className='todo-editing--deadline'>
            <label>Deadline:</label>
            <DatePicker ref='date-picker' />
          </div>

          <div>
            <Button styleType='primary' onClick={this.editDone.bind()}>OK</Button>
          </div>
          
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(Todo);
