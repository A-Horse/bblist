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

const TaskBoardWallPageContainer = React.lazy(() => import('./Project/BoardWall/BoardWall.container'));
const TaskBoardWallPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskBoardWallPageContainer />
    </Suspense>
  );
};

const TaskBoardPageContainer = React.lazy(() => import('./Task/ProjectPage/ProjectPage.container'));
const TaskBoardPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskBoardPageContainer />
    </Suspense>
  );
};

const ProfilePageContainer = React.lazy(() => import('../page/Profile/ProfilePage.container'));
const ProfilePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilePageContainer />
    </Suspense>
  );
};

export default class App extends Component<any> {
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
                    pathname: '/project'
                  }}
                />
              )}
            />

            <Route exact path="/project" component={TaskBoardWallPage} />
            <Route path="/task-board/:boardId" component={TaskBoardPage} />

            <Route path="/todo/:boxId" component={TodoPage} />
            <Route
              exact
              path="/todo"
              render={() => (
                <Redirect
                  to={{
                    pathname: '/todo/@all'
                  }}
                />
              )}
            />

            <Route path="/setting" component={SettingPage} />
            <Route path="/profile" component={ProfilePage} />

            <Route path="*" component={NotFound} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}
