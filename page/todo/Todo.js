import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

import {getTodoList} from 'actions/todo/todos';

import 'style/page/todo/todo.scss';

@Radium
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
      <div className="todo" ref='main' draggable='true' onDragStart={this.onDragStart.bind(this)}
           onClick={this.onClick.bind(this)}
           onDragEnd={this.onDragEnd.bind(this)}>
        <p>{todo.content}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(Todo);
