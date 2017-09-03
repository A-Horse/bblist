import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { BrowserRouter } from 'react-router-dom';

import { Router, Route, Switch, Redirect } from 'react-router';
import createHistory from 'history/createBrowserHistory';

import thunkMiddleware from 'redux-thunk';
import { createDevTools } from 'redux-devtools';
// import LogMonitor from 'redux-devtools-log-monitor';
// import DockMonitor from 'redux-devtools-dock-monitor';

import App from 'containers/App';
import SignUp from 'containers/SignUp';
import SignIn from 'containers/SignIn';

import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { checkLogin } from 'utils/auth';
import * as reducers from 'reducers';

import rootEpic from './epic';

// TODO 不应该全部引入
// import 'rxjs'; // https://redux-observable.js.org/docs/Troubleshooting.html RxJS operators are missing!

import 'style/normalize.css';
import 'style/app.scss';

const epicMiddleware = createEpicMiddleware(rootEpic);

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

// const DevTools = createDevTools(
//   <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
//     <LogMonitor theme="tomorrow" preserveScrollTop={false} />
//   </DockMonitor>
// );

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  // DevTools.instrument(),
  applyMiddleware(thunkMiddleware, epicMiddleware)
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
