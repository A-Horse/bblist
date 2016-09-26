import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import {applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import {App} from 'components';
import {SignIn, SignUp, Profile, Goal, Tasks, TaskWall, NotFound, DashBoard,
        IndexPage, Ideas, TaskWallSetting, TodoList} from 'page';
import Body from 'components/Body';

import {checkLogin} from 'utils/auth';
import * as reducers from 'reducers';

import 'style/normalize.css';
import 'style/app.scss';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

const store = createStoreWithMiddleware(
  reducer,
  DevTools.instrument()
);
const history = syncHistoryWithStore(browserHistory, store);

// TODO extract it router
ReactDOM.render(
  <Provider store={store}>
    <Body>
      <Router history={history}>
        <Route path="/" component={App} >
          <IndexRoute component={IndexPage}/>
          
          <Route path="home" component={DashBoard} onEnter={checkLogin}/>
          <Route path="signin" component={SignIn}/>
          <Route path="signup" component={SignUp}/>
          <Route path="profile" component={Profile}/>
          <Route path="idea" component={Ideas}/>
          <Route path="goal" component={Goal}/>
          
          <Route path="task-wall" component={Tasks} onEnter={checkLogin}/>
          <Route path="task-wall/:id" component={TaskWall} onEnter={checkLogin}/>
          <Route path="task-wall/:id/setting" component={TaskWallSetting} onEnter={checkLogin}/>

          <Route path="todo" component={TodoList}/>

          <Route path="404" component={NotFound} />
        </Route>
      </Router>
      <DevTools />
    </Body>
  </Provider>,
  document.getElementById('root')
);

// require('offline-plugin/runtime').install();
