import React, { Component } from 'react';
import { PageContainer } from 'components/widget/PageContainer';
import { connect } from 'react-redux';
import TodoCreater from './TodoCreater';
import Todo from './Todo';

import { createTodo, getTodoList } from 'actions/todo/todos';

import 'style/page/todo/todo-list.scss';

class TodoList extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(getTodoList());
  }

  componentDidUpdate() {

  }

  renderList() {
    const {todos} = this.props;
    return todos.map(todo => {
      return <Todo key={todo.id} todo={todo} dispatch={this.props.dispatch} />;
    });
  }

  render() {
    return (
      <div className='todo-list'>
        <TodoCreater/>
        {this.renderList()}
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
