import './TodoPage.scss';

import { Layout } from 'antd';
import React, { Component } from 'react';

import { updateTitle } from '../../services/title';
import TodoBoxs from './TodoBoxs/TodoBoxs';
import { TodoPageContentContainer } from './TodoPageContent/TodoPageContent.container';

const { Sider, Content } = Layout;

export class TodoPage extends Component<any> {
  componentDidUpdate() {
    updateTitle('Todo');
  }

  render() {
    return (
      <Layout className="todo-page">
        <Sider className="todo-page--sider" width="280px">
          <TodoBoxs todoBoxs={this.props.todoBoxs} actions={this.props.actions} />
        </Sider>
        <Content className="todo-page--main" style={{ height: 'calc(100vh - 42px)' }}>
          <TodoPageContentContainer />
        </Content>
      </Layout>
    );
  }
}
