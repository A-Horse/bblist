import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Route, Switch, Redirect } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { createDevTools } from 'redux-devtools';
import history from './services/history';

import 'style/normalize.css';
import 'style/app.scss';

// import LogMonitor from 'redux-devtools-log-monitor';
// import DockMonitor from 'redux-devtools-dock-monitor';

import App from 'page/App.container';
import SignUp from 'containers/SignUp';
import SignIn from 'page/SignIn.container';

import * as reducers from 'reducers';
import rootEpic from './epic';

const routeMiddleware = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware(rootEpic);

// const DevTools = createDevTools(
//   <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
//     <LogMonitor theme="tomorrow" preserveScrollTop={false} />
//   </DockMonitor>
// );

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  // DevTools.instrument(),
  applyMiddleware(thunkMiddleware, routeMiddleware, epicMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* <Route exact path="" component={IndexPage} /> */}
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/" component={App} />
        <Route render={() => <div>404</div>} />
      </Switch>
    </ConnectedRouter>
    {/*<DevTools />*/}
  </Provider>,
  document.getElementById('root')
);
