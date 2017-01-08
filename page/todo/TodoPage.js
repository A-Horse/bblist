import React, {Component} from 'react';
import {PageContainer} from 'components/widget/PageContainer';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {makeGravatarUrl} from 'services/gravatar';
import TodoList from './TodoList';
import PomodoraDial from './PomodoraDial';
import {createTodo, getTodoList} from 'actions/todo/todos';


class TodoPage extends Component {
  componentWillMount() {
    this.state = {
      
    };
  }
  
  componentDidUpdate() {
    
  }
  
  render() {
    return (
      <PageContainer className='todo-page'>
        <TodoList />
        <PomodoraDial />
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(TodoPage);
