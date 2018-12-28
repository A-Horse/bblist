//
import React, { Component } from 'react';
import { updateTitle } from '../../services/title';
import { Route, Switch, Redirect } from 'react-router';
import { TodoPageContentContainer } from './TodoPageContent/TodoPageContent.container';
import TodoBoxs from './TodoBoxs/TodoBoxs';

import { Layout } from 'antd';

import './TodoPage.less';

const { Sider, Content } = Layout;

export class TodoPage extends Component {
  componentDidUpdate() {
    updateTitle('Todo');
  }

  render() {
    const todoBoxId = this.props.match.params.boxId;
    if (!todoBoxId) {
      return <Redirect to="/todo/@all" />;
    }

    return (
      <Layout style={{ padding: '0 50px' }}>
        <Sider>
          <TodoBoxs todoBoxs={this.props.todoBoxs} actions={this.props.actions} />
        </Sider>
        <Content style={{ height: 'calc(100vh - 42px)' }}>
          <TodoPageContentContainer />
        </Content>
      </Layout>
    );
  }
}
