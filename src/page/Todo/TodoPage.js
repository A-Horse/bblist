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
      <Layout>
        <Sider>
          <TodoBoxs
            todoBoxs={this.props.todoBoxs}
            actions={this.props.actions}
            match={this.props.match}
          />
        </Sider>
        <Content>
          <TodoPageContentContainer />
        </Content>
      </Layout>
    );
  }
}

export default TodoPage;
