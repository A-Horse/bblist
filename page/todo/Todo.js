import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CheckBox} from 'components/widget/CheckBox';

import {getTodoList} from 'actions/todo/todos';
import {MoreIcon} from 'services/svg-icons';

import 'style/page/todo/todo.scss';

class Todo extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      
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
  
  render() {
    const {todo} = this.props;
    return (
      <div className='todo' ref='main' draggable='true' onDragStart={this.onDragStart.bind(this)}
           onClick={this.onClick.bind(this)}
           onDragEnd={this.onDragEnd.bind(this)}>
        
        <div className='todo--main'>
          <CheckBox ref='checkbox'/>
          <p className='todo--content'>{todo.content}</p>
          
          <div>
            <MoreIcon className='more-icon' />
          </div>
        </div>
        
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(Todo);
