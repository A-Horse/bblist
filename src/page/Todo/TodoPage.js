import React, { Component } from 'react';
import { updateTitle } from 'services/title';
import { TodoPageContentContainer } from './TodoPageContent/TodoPageContent.container';
import TodoBoxs from './TodoBoxs/TodoBoxs';
import PropTypes from 'prop-types';

import { Layout } from 'antd';
const { Sider, Content } = Layout;

import './TodoPage.less';

export class TodoPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.any,
    todoBoxs: PropTypes.any
  };

  componentDidUpdate() {
    updateTitle('Todo');
  }

  render() {
    return (
      <Layout style={{ padding: '0 50px' }}>
        <Sider>
          <TodoBoxs
            todoBoxs={this.props.todoBoxs}
            actions={this.props.actions}
            match={this.props.match}
          />
        </Sider>
        <Content style={{ height: 'calc(100vh - 42px)' }}>
          <TodoPageContentContainer />
        </Content>
      </Layout>
    );
  }
}
