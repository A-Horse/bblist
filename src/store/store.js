import { combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import * as reducers from '../reducers';
import rootEpic from '../epic';
/* import epicAdapterService from '../services/single/epic-adapter.service'; */

import configureStore from './configureStore';

const routeMiddleware = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware();

export const store = configureStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(thunkMiddleware, routeMiddleware, epicMiddleware),
  () => {
    epicMiddleware.run(rootEpic, {
      /* adapter: epicAdapterService */
    });
  }
);
