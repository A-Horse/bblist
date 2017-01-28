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

import {App, BlankPage} from 'components';
// TODO split it
import {Profile, Tasks, TaskWall, NotFound, DashBoard,
        IndexPage, Ideas, BoardSetting, BoardContent, TodoPage} from 'page';
import SignUp from 'containers/SignUp';
import SignIn from 'containers/SignIn';
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

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(
  reducer,
  // DevTools.instrument()
);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Body>
      <Router history={history}>
        <Route path='/' component={BlankPage}>
          <IndexRoute path='' component={IndexPage}/>

          <Route path="signin" component={SignIn}/>
          <Route path="signup" component={SignUp}/>
        </Route>

        <Route path="/" component={App} >
  
          <Route path="home" component={DashBoard} onEnter={checkLogin}/>
    
          <Route path="profile" component={Profile}/>
          <Route path="idea" component={Ideas}/>
          <Route path="task-wall" component={Tasks} onEnter={checkLogin}/>

          <Route path="task-wall/" component={TaskWall} onEnter={checkLogin}>
            <Route path="/task-wall/:id" component={BoardContent}/>
            <Route path="/task-wall/:id/setting" component={BoardSetting}/>
          </Route>          

          <Route path="todo" component={TodoPage}/>

          <Route path="404" component={NotFound} />
        </Route>

        
      </Router>
      <DevTools />
    </Body>
  </Provider>,
  document.getElementById('root')
);

// require('offline-plugin/runtime').install();
