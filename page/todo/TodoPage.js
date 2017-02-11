import React, {Component} from 'react';
import {PageContainer} from 'components/widget/PageContainer';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {makeGravatarUrl} from 'services/gravatar';
import TodoList from './TodoList';
import PomodoraDial from './PomodoraDial';
import {createTodo, getTodoList} from 'actions/todo/todos';
import {updateTitle} from 'services/title';
import TodoBoxs from './TodoBoxs';

import 'style/page/todo/todo-page.scss';


class TodoPage extends Component {
  componentWillMount() {
    this.state = {
      
    };
  }
  
  componentDidUpdate() {
    updateTitle('Todo');
  }
  
  render() {
    return (
      <PageContainer className='todo-page cover'>
        <div className='todo-box-container'>
          <TodoBoxs/>
        </div>
        <div className='todo-list-container'>
          <TodoList/>
        </div>        
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(TodoPage);
