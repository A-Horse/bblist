import { combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import * as reducers from '../reducers';
import rootEpic from '../epic';

const routeMiddleware = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware(rootEpic);

import configureStore from './configureStore';

export const store = configureStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(thunkMiddleware, routeMiddleware, epicMiddleware)
);

/* export const store = createStore(
 *   combineReducers({
 *     ...reducers,
 *     router: routerReducer
 *   }),
 *   // DevTools.instrument(),
 *   applyMiddleware(thunkMiddleware, routeMiddleware, epicMiddleware)
 * ); */
