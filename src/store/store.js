import { combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import * as reducers from '../reducers';
import rootEpic from '../epic';
import epicAdapterService from '../services/single/epic-adapter.service';

const routeMiddleware = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware(rootEpic, {
  adapter: epicAdapterService
});

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
