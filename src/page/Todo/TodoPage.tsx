import React, { Component } from 'react';
import { updateTitle } from '../../services/title';
import { TodoPageContentContainer } from './TodoPageContent/TodoPageContent.container';
import TodoBoxs from './TodoBoxs/TodoBoxs';

import { Layout } from 'antd';

import './TodoPage.scss';

const { Sider, Content } = Layout;

export class TodoPage extends Component<any> {
  componentDidUpdate() {
    updateTitle('Todo');
  }

  render() {
    return (
      <Layout className="todo-page">
        <Sider className="todo-page--sider">
          <TodoBoxs todoBoxs={this.props.todoBoxs} actions={this.props.actions} />
        </Sider>
        <Content  className="todo-page--main" style={{ height: 'calc(100vh - 42px)' }}>
          <TodoPageContentContainer />
        </Content>
      </Layout>
    );
  }
}
