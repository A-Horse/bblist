import { applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from '../epic/index';
import * as reducers from '../reducers';
// import history from '../services/history';
// NOTE: if need router <=> redux sync see 👇
// https://github.com/supasate/connected-react-router
import { configureStore } from './configureStore';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore(
  combineReducers({
    ...reducers,
  }),
  applyMiddleware(epicMiddleware),
  () => {
    epicMiddleware.run(rootEpic);
  }
);
