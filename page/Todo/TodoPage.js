import React, { Component } from 'react';
import { PageContainer } from 'components/widget/PageContainer';
import { updateTitle } from 'services/title';
import TodoBoxs from './TodoBoxs/TodoBoxs';
import TodoRepeatHistoryModal from 'containers/todo/TodoRepeatHistoryModal';
import TodoList from './TodoList/TodoList.container';

import './TodoPage.scss';

class TodoPage extends Component {
  state = {};

  componentDidUpdate() {
    updateTitle('Todo');
  }

  render() {
    return (
      <PageContainer className="todo-page">
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
