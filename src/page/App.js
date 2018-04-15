// @flow
import React, { Component } from 'react';
import Nav from './Nav/Nav';
import Bundle from '../components/Bundle';

import { Route, Switch, Redirect } from 'react-router';

import NotFound from '../page/NotFound';
import DashBoard from '../page/DashBoard';

import Ideas from '../containers/idea/Ideas';
import { getUserData } from '../utils/auth';
import { Layout } from 'antd';
const { Content } = Layout;

const TodoPage = props => (
  <Bundle load={require('bundle-loader?lazy&name=todo-page!./Todo/TodoPage.container')}>
    {B => <B {...props} />}
  </Bundle>
);

const SettingPage = props => (
  <Bundle load={require('bundle-loader?lazy&name=setting-page!./Setting/SettingPage.container')}>
    {B => <B {...props} />}
  </Bundle>
);

const TaskBoardWallPage = props => (
  <Bundle
    load={require('bundle-loader?lazy&name=task-board-wall-page!./Task/BoardWall/BoardWall.container')}
  >
    {B => <B {...props} />}
  </Bundle>
);

const TaskBoardPage = props => (
  <Bundle load={require('bundle-loader?lazy&name=task-board-page!page/Task/Board/Board.container')}>
    {B => <B {...props} />}
  </Bundle>
);

const ProfilePage = props => (
  <Bundle load={require('bundle-loader?lazy&name=profile-page!page/Profile/ProfilePage.container')}>
    {B => <B {...props} />}
  </Bundle>
);

export default class App extends Component<
  {
    actions: { [*]: * },
    identifyFetching: boolean,
    identifyAuthenticated: boolean
  },
  {
    userData: UserData | null
  }
> {
  state = { userData: null };

  componentWillMount() {
    const userData = getUserData();
    this.props.actions.SETUP_USER_REQUEST(userData);
    this.setState({ userData });
  }

  componentDidMount() {}

  componentWillReceiveProps() {}

  render() {
    if (!this.state.userData) {
      return <Redirect to="/signin" />;
    }
    return (
      <Layout>
        <Nav user={this.state.userData} actions={this.props.actions} />

        <Content>
          <Switch>
            <Route path="/home" component={DashBoard} />

            <Route path="/idea" component={Ideas} />

            <Route exact path="/task-board" component={TaskBoardWallPage} />
            <Route path="/task-board/:boardId" component={TaskBoardPage} />

            <Route path="/todo/:boxId" component={TodoPage} />
            <Route exact path="/todo" component={TodoPage} />

            <Route path="/setting" component={SettingPage} />
            <Route path="/profile" component={ProfilePage} />

            <Route path="*" component={NotFound} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}
