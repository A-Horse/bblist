import React, {Component} from 'react';
import {PageContainer} from 'components/widget/PageContainer';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {makeGravatarUrl} from 'services/gravatar';
import {getGoalList, createGoal} from 'actions/goal/goal';
import TodoCreater from './TodoCreater';
import Todo from './Todo';

import {createTodo, getTodoList} from 'actions/todo/todos';


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
      <PageContainer>
        {this.renderList()}
        <TodoCreater />
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.list
  };
};

export default connect(mapStateToProps)(TodoList);
