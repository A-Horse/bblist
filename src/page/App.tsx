import './App.scss';

import { Layout } from 'antd';
import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { NotFound } from '../page/NotFound';
import { getUserData } from '../utils/auth';
import Nav from './Nav/Nav';

const SettingPageContainer = React.lazy(() =>
  import('./Setting/SettingPage.container')
);
const SettingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingPageContainer />
    </Suspense>
  );
};

const ProjectWallPageContainer = React.lazy(() =>
  import('./Project/ProjectWallPage/ProjectWall.container')
);
const ProjectWallPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectWallPageContainer />
    </Suspense>
  );
};

const ProjectPageContainer = React.lazy(() =>
  import('./Project/ProjectPage/ProjectPage')
);
const ProjectPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectPageContainer />
    </Suspense>
  );
};

const ProfilePageContainer = React.lazy(() =>
  import('../page/Profile/ProfilePage.container')
);
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
      <>
        <Nav user={this.state.userData} actions={this.props.actions} />

        <>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Redirect
                  to={{
                    pathname: '/projects'
                  }}
                />
              )}
            />

            <Route exact path="/projects" component={ProjectWallPage} />
            <Route path="/project/:projectID" component={ProjectPage} />

            <Route path="/setting" component={SettingPage} />
            <Route path="/profile" component={ProfilePage} />

            <Route path="*" component={NotFound} />
          </Switch>
        </>
      </>
    );
  }
}
