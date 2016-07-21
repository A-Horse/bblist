
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as reducers from './reducers'
import { App, Home, Foo, Bar, Login, SignUp, TaskWall, TaskCard, NotFound, DashBoard, Profile} from './components'
import {checkLogin} from './utils/auth'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

const store = createStoreWithMiddleware(
  reducer,
  DevTools.instrument()
)
const history = syncHistoryWithStore(browserHistory, store)


ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App} >
          <IndexRoute component={DashBoard} onEnter={checkLogin} />
          <Route path="foo" component={Foo} onEnter={checkLogin}/>
          <Route path="404" component={NotFound} />
          <Route path="bar" component={Bar}/>
          <Route path="login" component={Login}/>
          <Route path="signup" component={SignUp}/>
          <Route path="profile" component={Profile}/>
          <Route path="task-wall" component={TaskWall} onEnter={checkLogin}/>
          <Route path="task-wall/:id" component={TaskCard} onEnter={checkLogin}/>
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
)
