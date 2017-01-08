import React, {Component} from 'react';
import {PageContainer} from 'components/widget/PageContainer';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {makeGravatarUrl} from 'services/gravatar';
import TodoCreater from './TodoCreater';
import DatePicker from 'components/date-picker/DatePicker';
import Todo from './Todo';

import {createTodo, getTodoList} from 'actions/todo/todos';

import 'style/page/todo/todo-list.scss';

class TodoList extends Component {
  componentWillMount() {
    this.state = {
      
    };
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(getTodoList());
  }
  
  componentDidUpdate() {
    
  }

  renderList() {
    const {todos} = this.props;
    return todos.map(todo => {
      return <Todo key={todo.id} todo={todo}></Todo>;
    });
  }

  render() {
    return (
      <div className='todo-list'>
        {this.renderList()}
        <TodoCreater />
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.list
  };
};

export default connect(mapStateToProps)(TodoList);
