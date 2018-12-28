//
import React, { Component, Suspense } from 'react';
import Nav from './Nav/Nav';
import { Route, Switch, Redirect } from 'react-router';

import NotFound from '../page/NotFound';

import { getUserData } from '../utils/auth';
import { Layout } from 'antd';
const { Content } = Layout;

const TodoPageContainer = React.lazy(() => import('./Todo/TodoPage.container'));
const TodoPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TodoPageContainer />
    </Suspense>
  );
};

const SettingPageContainer = React.lazy(() => import('./Setting/SettingPage.container'));
const SettingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingPageContainer />
    </Suspense>
  );
};

const TaskBoardWallPageContainer = React.lazy(() => import('./Task/BoardWall/BoardWall.container'));
const TaskBoardWallPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskBoardWallPageContainer />
    </Suspense>
  );
};

const TaskBoardPageContainer = React.lazy(() => import('../page/Task/Board/Board.container'));
const TaskBoardPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskBoardPageContainer />
    </Suspense>
  );
};

const ProfilePage = React.lazy(() => import('../page/Profile/ProfilePage.container'));
// const ProfilePage = props => (
//   <Bundle load={require('bundle-loader?lazy&name=profile-page!page/Profile/ProfilePage.container')}>
//     {B => <B {...props} />}
//   </Bundle>
// );

export default class App extends Component {
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
            <Route
              path="/"
              exact
              render={() => (
                <Redirect
                  to={{
                    pathname: '/task-board'
                  }}
                />
              )}
            />

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
