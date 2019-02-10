import React, { Component } from 'react';
import { updateTitle } from '../../services/title';
import { Redirect } from 'react-router';
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
      <Layout className="todo-page" style={{ padding: '0 50px' }}>
        <Sider theme="dark">
          <TodoBoxs todoBoxs={this.props.todoBoxs} actions={this.props.actions} />
        </Sider>
        <Content style={{ height: 'calc(100vh - 42px)' }}>
          <TodoPageContentContainer />
        </Content>
      </Layout>
    );
  }
}
