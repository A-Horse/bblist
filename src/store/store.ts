import { combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import * as reducers from '../reducers';
import rootEpic from '../epic';

// import history from '../services/history';

// NOTE: if need router <=> redux sync see 👇
// https://github.com/supasate/connected-react-router

import { configureStore } from './configureStore';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore(
  combineReducers({
    ...reducers
  }),
  applyMiddleware(thunkMiddleware, epicMiddleware),
  () => {
    epicMiddleware.run(rootEpic);
  }
);
