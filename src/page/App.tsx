import './App.scss';

import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { NotFound } from './NotFound';
import { Nav } from './Nav/Nav';
import { useClaims } from '../hook/useClaims';
import { Claims } from '../typings/claims';

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
  import('./Project/ProjectWallPage/ProjectWall')
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

export function App() {
  const claims: Claims | null = useClaims();
  if (!claims) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Nav
        user={{
          id: claims.userId,
          username: claims.username,
          email: claims.email,
        }}
      />

      <>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Redirect
                to={{
                  pathname: '/projects',
                }}
              />
            )}
          />

          <Route path="/projects" component={ProjectWallPage} />
          <Route path="/project/:projectId" component={ProjectPage} />

          <Route path="/setting" component={SettingPage} />
          <Route path="/profile" component={ProfilePage} />

          <Route path="*" component={NotFound} />
        </Switch>
      </>
    </>
  );
}
