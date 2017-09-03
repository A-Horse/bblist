import React, { Component } from 'react';
import { PageContainer } from 'components/widget/PageContainer';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { makeGravatarUrl } from 'services/gravatar';
import TodoList from './TodoList';
import PomodoraDial from './PomodoraDial';
import { createTodo, getTodoList } from 'actions/todo/todos';
import { updateTitle } from 'services/title';
import TodoBoxs from './TodoBoxs';
import TodoRepeatHistoryModal from 'containers/todo/TodoRepeatHistoryModal';

import 'style/page/todo/todo-page.scss';

class TodoPage extends Component {
  state = {};

  componentDidUpdate() {
    updateTitle('Todo');
  }

  render() {
    return (
      <PageContainer className="todo-page cover">
        <div className="todo-box-container">
          <TodoBoxs actions={this.props.actions} />
        </div>
        <div className="todo-list-container">
          <TodoList boxId={this.props.match.params.id} />
        </div>
        <TodoRepeatHistoryModal />
      </PageContainer>
    );
  }
}

export default TodoPage;
