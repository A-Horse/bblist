import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './Application';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import * as reducers from 'reducers';
import rootEpic from './epic';

const routeMiddleware = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware(rootEpic);

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
    <Application />
  </Provider>,
  document.getElementById('root')
);
